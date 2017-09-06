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
        response = HttpResponse(content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = 'attachment; filename="compras.xls"'

        wb = xlwt.Workbook(encoding='utf-8', style_compression=2)
        ws = wb.add_sheet('VIEW_SCOMPRAS')

        row_num = 0

        titulo_style = xlwt.XFStyle()
        titulo_style.font.bold = True
        titulo_style.alignment.horz = titulo_style.alignment.HORZ_CENTER
        bordes_titulo = xlwt.Borders()
        bordes_titulo.left = xlwt.Borders.THIN
        bordes_titulo.right = xlwt.Borders.THIN
        titulo_style.borders = bordes_titulo

        resultados_style = xlwt.XFStyle()

        xlwt.add_palette_colour("LightYellow", 0x21)
        wb.set_colour_RGB(0x21, 255, 255, 224)

        xlwt.add_palette_colour("GhostWhite", 0x22)
        wb.set_colour_RGB(0x22, 248, 248, 255)

        xlwt.add_palette_colour("Azure", 0x23)
        wb.set_colour_RGB(0x23, 240, 255, 255)

        bordes_resultados = xlwt.Borders()
        bordes_resultados.bottom = xlwt.Borders.THIN
        bordes_resultados.right = xlwt.Borders.THIN
        bordes_resultados.left = xlwt.Borders.THIN
        bordes_resultados.top = xlwt.Borders.THIN
        resultados_style.borders = bordes_resultados

        columns = [
            'Compañia', 'Sucursal', 'Requisición', 'Tipo', 'Originador', 'Fecha creación', 'Fecha necesidad',
            'Linea', 'Tipo linea', 'Último estatus', 'Siguiente estatus', 'Comprador',
            'No. item', 'Descripción del item', 'Cantidad solicitada', 'UDM', 'Cotización', 'Tipo',
            'Fecha creación', 'Originador', 'Linea', 'Último estado', 'Siguiente estado',
            'OC', 'Tipo', 'Fecha creación', 'Fecha entrega', 'Originador', 'Linea',
            'Proveedor codigo', 'Proveedor descripcion', 'Último estado', 'Siguiente estado',
            'Cantidad', 'Moneda', 'Costo Unitario MXP', 'Total de linea MXP', 'Costo Unitario USD',
            'Total de linea USD',  'Impuesto', 'Recepción',
        ]

        for col_num in range(len(columns)):
            ws.col(col_num).width = (256 * len(columns[col_num])) + (256 * 5)
            ws.write(row_num, col_num, columns[col_num], titulo_style)

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

        rows = VIEW_SCOMPRAS.objects.using('jde_p').filter(**argumentos).values_list(
            'req_compania', 'req_un', 'req', 'req_tipo', 'req_generador', 'req_fecha_creacion', 'req_fecha_necesidad',
            'req_linea', 'req_linea_tipo', 'req_estado_last', 'req_estado_next', 'req_comprador_desc',
            'req_item_numero', 'req_item_desc', 'req_cantidad_solicitada', 'req_udm', 'cot', 'cot_tipo',
            'cot_fecha_creacion', 'cot_generador', 'cot_linea', 'cot_estado_last', 'cot_estado_next',
            'ord', 'ord_tipo', 'ord_fecha_creacion', 'ord_fecha_entrega', 'ord_generador', 'ord_linea',
            'ord_proveedor', 'ord_proveedor_desc', 'ord_estado_last', 'ord_estado_next',
            'ord_cantidad_solic', 'ord_moneda', 'ord_pu_mx', 'ord_total_mx', 'ord_pu_ex', 'ord_total_ex', 'ord_impuesto', 'ord_recepcion')

        date_format = xlwt.XFStyle()
        date_format.num_format_str = 'dd/mm/yyyy'

        for row in rows:
            row_num += 1
            for col_num in range(len(row)):
                pattern = xlwt.Pattern()
                pattern.pattern = xlwt.Pattern.SOLID_PATTERN

                if col_num >= 0 and col_num <= 15:
                    pattern.pattern_fore_colour = xlwt.Style.colour_map['LightYellow']


                elif col_num >= 16 and col_num <= 22:
                    pattern.pattern_fore_colour = xlwt.Style.colour_map['GhostWhite']


                elif col_num >= 23 and col_num <= 41:
                    pattern.pattern_fore_colour = xlwt.Style.colour_map['Azure']

                resultados_style.pattern = pattern

                if isinstance(row[col_num], datetime.date):

                    anio = row[col_num].year
                    if anio <= 1500:

                        fecha = str(row[col_num].day) + "/" + str(row[col_num].month) + "/" + str(row[col_num].year)
                        resultados_style.alignment.horz = resultados_style.alignment.HORZ_RIGHT
                        ws.write(row_num, col_num, fecha, resultados_style)

                    else:


                        date_format.pattern = pattern
                        date_format.borders = bordes_resultados
                        ws.write(row_num, col_num, row[col_num], date_format)
                else:
                    ws.write(row_num, col_num, row[col_num], resultados_style)

        wb.save(response)
        return response
