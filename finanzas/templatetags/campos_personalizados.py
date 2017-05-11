from django import template

register = template.Library()


@register.inclusion_tag('fields/campo_fecha.html')
def campo_fecha(fecha):

    clave_fecha = "%s-date" % (fecha.auto_id)
    clave = fecha.auto_id

    if fecha.value():
        valor = fecha.value()
    else:
        valor = ""

    return {
        'clave_fecha': clave_fecha,
        'clave': clave,
        'valor': valor
    }
