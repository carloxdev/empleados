# -*- coding: utf-8 -*-

# Django's Libraries
from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
from django.contrib import messages
from django.utils.decorators import method_decorator

# Own's Libraries
from .business import ViaticoBusiness
from home.decorators import group_required

from jde.models import VIEW_COMPANIAS

from .forms import ViaticoCabeceraForm
from .forms import ViaticoFilterForm
from .forms import ViaticoLineaForm
from .forms import AnticipoFilterForm
from .forms import FLujoFilterForm

from home.utilities import get_Url_With_Querystring


class ViaticoLista(View):
    template_name = 'viatico/viatico_lista.html'

    def get(self, _request):

        formulario = ViaticoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(_request, self.template_name, contexto)


class ViaticoCabeceraNuevo(View):
    template_name = 'viatico/viatico_nuevo.html'

    def get(self, _request):

        formulario = ViaticoCabeceraForm()

        contexto = {
            'form': formulario
        }

        return render(_request, self.template_name, contexto)

    def post(self, _request):

        formulario = ViaticoCabeceraForm(_request.POST)

        if formulario.is_valid():

            viatico_cabecera = formulario.save(commit=False)

            try:

                ViaticoBusiness.set_Data_Autorizacion(viatico_cabecera)
                ViaticoBusiness.set_Data_Compania(viatico_cabecera)

                viatico_cabecera.created_by = _request.user.profile
                viatico_cabecera.updated_by = _request.user.profile
                viatico_cabecera.save()

                return redirect(
                    get_Url_With_Querystring(
                        reverse('finanzas:viatico_editar', kwargs={'_pk': viatico_cabecera.pk}),
                        new=True
                    )
                )

            except Exception as e:
                messages.error(_request, str(e))

        contexto = {
            'form': formulario
        }
        return render(_request, self.template_name, contexto)


class ViaticoCabeceraEditar(View):
    template_name = 'viatico/viatico_editar.html'

    def get(self, _request, _pk):

        viatico_cabecera = ViaticoBusiness.get_ViaticoCabecera(_pk)

        if len(_request.GET):
            flag_new = bool(_request.GET['new'])
        else:
            flag_new = False

        formulario_cabecera = ViaticoCabeceraForm(
            instance=viatico_cabecera
        )

        formulario_linea = ViaticoLineaForm(
            viatico_cabecera.empleado_clave
        )

        contexto = {
            'form_cabecera': formulario_cabecera,
            'form_linea': formulario_linea,
            'flag_new': flag_new
        }
        return render(_request, self.template_name, contexto)

    def post(self, _request, _pk):

        viatico_cabecera = ViaticoBusiness.get_ViaticoCabecera(_pk)

        formulario_cabecera = ViaticoCabeceraForm(
            _request.POST,
            instance=viatico_cabecera
        )

        formulario_linea = ViaticoLineaForm(
            viatico_cabecera.empleado_clave
        )

        if 'guardar' in _request.POST:

            if formulario_cabecera.is_valid():

                new_data = formulario_cabecera.save(commit=False)

                try:
                    ViaticoBusiness.set_Data_Autorizacion(new_data)
                    ViaticoBusiness.set_Data_Compania(new_data)

                    new_data.updated_by = _request.user.profile
                    new_data.save()
                    messages.success(_request, "Se modifico la solicitud exitosamente")

                except Exception as e:
                    messages.error(_request, str(e))

        elif 'fin_captura' in _request.POST:

            try:
                ViaticoBusiness.set_FinalizarCaptura(viatico_cabecera, _request.user)
                ViaticoBusiness.send_Mail_ToFinish(
                    "APPS: Viatico V-%s de %s (%s) pendiente de autorizar por %s (%s)" % (
                            viatico_cabecera.id,
                            viatico_cabecera.empleado_descripcion,
                            viatico_cabecera.empleado_clave,
                            viatico_cabecera.autorizador_descripcion,
                            viatico_cabecera.autorizador_clave,
                    ),
                    "Se registro el viatico V-%s de %s (%s) por %s pesos. Y esta pendiente de autorizar por %s (%s)." % (
                        viatico_cabecera.id,
                        viatico_cabecera.empleado_descripcion,
                        viatico_cabecera.empleado_clave,
                        viatico_cabecera.importe_total,
                        viatico_cabecera.autorizador_descripcion,
                        viatico_cabecera.autorizador_clave,
                    ),
                    viatico_cabecera,
                    _request.user
                )

                return redirect(reverse('finanzas:viatico_lista'))

            except Exception as e:
                messages.error(_request, str(e))

        contexto = {
            'form_cabecera': formulario_cabecera,
            'form_linea': formulario_linea
        }
        return render(_request, self.template_name, contexto)


class ViaticoCabeceraCancelar(View):
    template_name = "viatico/viatico_cancelar.html"

    def get(self, _request, _pk):

        viatico_cabecera = ViaticoBusiness.get_ViaticoCabecera(_pk)

        contexto = {
            'viatico_cabecera': viatico_cabecera
        }

        return render(_request, self.template_name, contexto)

    def post(self, _request, _pk):

        viatico_cabecera = ViaticoBusiness.get_ViaticoCabecera(_pk)

        try:
            ViaticoBusiness.cancelar(viatico_cabecera, _request.user)

            return redirect(reverse('finanzas:viatico_lista'))

        except Exception as e:
            messages.error(_request, str(e))

        contexto = {
            'viatico_cabecera': viatico_cabecera
        }

        return render(_request, self.template_name, contexto)


class AnticipoLista(View):
    def __init__(self):
        self.template_name = 'anticipo/anticipo_lista.html'

    def get(self, _request):
        formulario = AnticipoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(_request, self.template_name, contexto)


@method_decorator(group_required('FINANZAS_ADMIN', 'FINANZAS_REPORTES'), name='dispatch')
class Flujo(View):
    template_name = 'reportes/flujo.html'

    def get(self, request):

        form = FLujoFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)

    def post(self, request):

        form = FLujoFilterForm(request.POST)
        try:
            if form.is_valid():
                datos_formulario = form.cleaned_data
                datos = {
                    'anio': datos_formulario.get('anio'),
                    'compania': datos_formulario.get('compania'),
                    'centro_costos': datos_formulario.get('centro_costos'),
                    'proyecto': datos_formulario.get('proyecto'),
                }
                request.session['datos'] = datos

                return redirect(reverse('finanzas:flujo_preview'))

        except Exception as e:
            messages.error(request, str(e))

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)


@method_decorator(group_required('FINANZAS_ADMIN', 'FINANZAS_REPORTES'), name='dispatch')
class FlujoPreview(View):
    template_name = 'reportes/flujo_preview.html'

    def get(self, request):
        datos = request.session['datos']
        clave = datos['compania']
        compania = VIEW_COMPANIAS.objects.using('jde_p').get(comp_code=clave)
        contexto = {
            'dato': datos,
            'compania': compania,
        }

        return render(request, self.template_name, contexto)
