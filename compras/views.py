# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render
from django.http import HttpResponse

# Librerias de Django
from django.views.generic.base import View

# Otras librerias
import xlwt
import datetime

# Librerias de Propias

# Modelos
from jde.models import VIEW_SCOMPRAS

# Formularios
from .forms import SeguimientoComprasFilterForm


# -------------- COMPRAS -------------- #

class SeguimientoComprasLista(View):
    def __init__(self):
        self.template_name = 'seguimiento_compras_lista.html'

    def get(self, request):

        formulario = SeguimientoComprasFilterForm(use_required_attribute=False)

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

    def post(self, request):
        print("NO")
        response = HttpResponse(content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = 'attachment; filename="compras.xls"'

        wb = xlwt.Workbook(encoding='utf-8')
        ws = wb.add_sheet('VIEW_SCOMPRAS')

        row_num = 0

        font_style = xlwt.XFStyle()
        font_style.font.bold = True

        columns = [
            'Compañia', 'Sucursal', 'Requisición', 'Tipo', 'Originador', 'Fecha creación', 'Fecha necesidad',
            'Linea', 'Tipo linea', 'Último estatus', 'Siguiente estatus', 'Comprador',
            'No. item', 'Descripción del item', 'Cantidad solicitada', 'UDM', 'Cotización', 'Tipo',
            'Fecha creación', 'Originador', 'Linea', 'Último estado', 'Siguiente estado',
            'OC', 'Tipo', 'Fecha creación', 'Fecha entrega', 'Originador', 'Linea',
            'Proveedor codigo', 'Proveedor descripcion', 'Último estado', 'Siguiente estado',
            'Cantidad', 'Moneda', 'Costo Unitario MXP', 'Total de linea MXP', 'Impuesto',
        ]

        for col_num in range(len(columns)):
            ws.write(row_num, col_num, columns[col_num], font_style)

        date_format = xlwt.XFStyle()
        date_format.num_format_str = 'dd/mm/yyyy'

        argumentos = {}
        campos_formulario = []
        for campos in SeguimientoComprasFilterForm():
            campos_formulario.append(campos.name)

        for datosPost in request.POST:
            if datosPost in campos_formulario:
                if request.POST[datosPost] != '':
                    if datosPost == 'compania':
                        argumentos['req_compania__exact'] = request.POST[datosPost]

                    if datosPost == 'sucursal':
                        argumentos['req_un__exact'] = request.POST[datosPost]

                    if datosPost == 'comprador':
                        argumentos['req_comprador_desc__icontains'] = request.POST[datosPost]

                    if datosPost == 'requisicion':
                        argumentos['req__exact'] = request.POST[datosPost]

                    if datosPost == 'requisicion_tipo':
                        argumentos['req_tipo__exact'] = request.POST[datosPost]

                    if datosPost == 'requisicion_originador':
                        argumentos['req_generador__contains'] = request.POST[datosPost]

                    if datosPost == 'requisicion_canceladas':
                        argumentos['req_estado_last__exact'] = request.POST[datosPost]

                    if datosPost == 'req_desde_hasta':
                        valores = request.POST.get('req_desde_hasta').split(" al ")
                        argumentos['req_fecha_creacion__gte'] = "{}T00:00:00".format(valores[0])
                        argumentos['req_fecha_creacion__lte'] = "{}T23:59:59".format(valores[1])

                    if datosPost == 'cotizacion':
                        argumentos['cot__exact'] = request.POST[datosPost]

                    if datosPost == 'cotizacion_tipo':
                        argumentos['cot_tipo__exact'] = request.POST[datosPost]

                    if datosPost == 'cotizacion_originador':
                        argumentos['cot_generador__contains'] = request.POST[datosPost]

                    if datosPost == 'cotizacion_canceladas':
                        argumentos['cot_estado_last__exact'] = request.POST[datosPost]

                    if datosPost == 'oc':
                        argumentos['ord__exact'] = request.POST[datosPost]

                    if datosPost == 'oc_tipo':
                        argumentos['ord_tipo__exact'] = request.POST[datosPost]

                    if datosPost == 'oc_originador':
                        argumentos['ord_generador__contains'] = request.POST[datosPost]

                    if datosPost == 'oc_canceladas':
                        argumentos['ord_estado_last__exact'] = request.POST[datosPost]

                    if datosPost == 'oc_desde_hasta':
                        valores = request.POST.get('oc_desde_hasta').split(" al ")
                        argumentos['ord_fecha_creacion__gte'] = "{}T00:00:00".format(valores[0])
                        argumentos['ord_fecha_creacion__lte'] = "{}T23:59:59".format(valores[1])

                    if datosPost == 'proveedor':
                        argumentos['ord_proveedor_desc__icontains'] = request.POST[datosPost]

                    if datosPost == 'item':
                        argumentos['req_item_desc__icontains'] = request.POST[datosPost]

                    if datosPost == 'recepcion':
                        argumentos['ord_recepcion__exact'] = request.POST[datosPost]

        print(argumentos)

        rows = VIEW_SCOMPRAS.objects.using('jde_p').filter(**argumentos).values_list(
            'req_compania', 'req_un', 'req', 'req_tipo', 'req_generador', 'req_fecha_creacion', 'req_fecha_necesidad',
            'req_linea', 'req_linea_tipo', 'req_estado_last', 'req_estado_next', 'req_comprador_desc',
            'req_item_numero', 'req_item_desc', 'req_cantidad_solicitada', 'req_udm', 'cot', 'cot_tipo',
            'cot_fecha_creacion', 'cot_generador', 'cot_linea', 'cot_estado_last', 'cot_estado_next',
            'ord', 'ord_tipo', 'ord_fecha_creacion', 'ord_fecha_entrega', 'ord_generador', 'ord_linea',
            'ord_proveedor', 'ord_proveedor_desc', 'ord_estado_last', 'ord_estado_next',
            'ord_cantidad_solic', 'ord_moneda', 'ord_pu_mx', 'ord_total_mx', 'ord_impuesto',)
        for row in rows:
            row_num += 1
            for col_num in range(len(row)):
                if isinstance(row[col_num], datetime.date):
                    ws.write(row_num, col_num, row[col_num], date_format)
                else:
                    ws.write(row_num, col_num, row[col_num])

        wb.save(response)
        return response
