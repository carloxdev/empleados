
# Django's Libraries
from django import template


register = template.Library()


@register.inclusion_tag(
    'tags/field_registro.html',
    takes_context=False)
def tag_field_registro(_field, _size_label, _size_field):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
    }
    return contexto


@register.inclusion_tag(
    'tags/field_registro_nval.html',
    takes_context=False)
def tag_field_registro_nval(_field, _size_label, _size_field):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
    }
    return contexto


@register.inclusion_tag(
    'tags/image_registro.html',
    takes_context=False)
def tag_image_registro(_field):

    contexto = {
        'campo': _field,
    }
    return contexto


@register.inclusion_tag(
    'tags/filter.html',
    takes_context=False)
def tag_filter(_field):

    contexto = {
        'campo': _field,
    }
    return contexto


@register.inclusion_tag(
    'tags/filter_date_range.html',
    takes_context=False)
def tag_filter_date_range(_campo_label, _campo_id):

    contexto = {
        'campo_label': _campo_label,
        'campo_id': _campo_id,
    }
    return contexto
