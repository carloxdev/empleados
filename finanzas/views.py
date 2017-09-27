# -*- coding: utf-8 -*-

# Django's Libraries
from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
from django.contrib import messages

# Own's Libraries
from .business import ViaticoBusiness

from .forms import ViaticoCabeceraForm
from .forms import ViaticoFilterForm
from .forms import ViaticoLineaForm

from .forms import AnticipoFilterForm

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

        if len(_request.GET):
            flag_new = bool(_request.GET['new'])
        else:
            flag_new = False

        formulario_cabecera = ViaticoCabeceraForm(
            instance=ViaticoBusiness.get_ViaticoCabecera(_pk)
        )

        formulario_linea = ViaticoLineaForm(
            ViaticoBusiness.get_ViaticoCabecera(_pk).empleado_clave
        )
        # import ipdb; ipdb.set_trace()
        contexto = {
            'form_cabecera': formulario_cabecera,
            'form_linea': formulario_linea,
            'flag_new': flag_new
        }
        return render(_request, self.template_name, contexto)

    def post(self, _request, _pk):
        import ipdb; ipdb.set_trace()
        if 'guardar' in _request.POST:

            formulario_cabecera = ViaticoCabeceraForm(
                _request.POST,
                instance=ViaticoBusiness.get_ViaticoCabecera(_pk)
            )
            formulario_linea = ViaticoLineaForm(
                ViaticoBusiness.get_ViaticoCabecera(_pk).empleado_clave
            )

            if formulario_cabecera.is_valid():

                viatico_cabecera = formulario_cabecera.save(commit=False)

                try:
                    ViaticoBusiness.set_Data_Autorizacion(viatico_cabecera)
                    ViaticoBusiness.set_Data_Compania(viatico_cabecera)

                    viatico_cabecera.updated_by = _request.user.profile
                    viatico_cabecera.save()
                    messages.success(_request, "Se modifico la solicitud exitosamente")

                except Exception as e:
                    messages.error(_request, str(e))

            contexto = {
                'form_cabecera': formulario_cabecera,
                'form_linea': formulario_linea
            }
            return render(_request, self.template_name, contexto)

        elif 'fin_captura' in _request.POST:

            formulario_cabecera = ViaticoCabeceraForm(
                _request.POST,
                instance=ViaticoBusiness.get_ViaticoCabecera(_pk)
            )
            formulario_linea = ViaticoLineaForm(
                ViaticoBusiness.get_ViaticoCabecera(_pk).empleado_clave
            )

            viatico_cabecera = ViaticoBusiness.get_ViaticoCabecera(_pk)

            try:
                ViaticoBusiness.set_FinalizarCaptura(viatico_cabecera, _request.user)

                ViaticoBusiness.send_Mail_ToFinish(
                    "APPS: Viatico VIA-%s pendiente de autorizar." % (viatico_cabecera.id),
                    "Tienes un viatico VIA-%s por autorizar, por %s pesos." % (viatico_cabecera.id, viatico_cabecera.importe_total),
                    viatico_cabecera,
                    _request.user
                )

                # return redirect(reverse('seguridad:autorizacion_lista'))

            except Exception as e:
                messages.error(_request, str(e))

            contexto = {
                'form_cabecera': formulario_cabecera,
                'form_linea': formulario_linea
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
