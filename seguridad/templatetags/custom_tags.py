
# Django's Libraries
from django import template


register = template.Library()


@register.inclusion_tag(
    'tags/field_legend_error.html',
    takes_context=False)
def tag_field_legend_error(_field):

    contexto = {
        'campo': _field
    }
    return contexto


@register.inclusion_tag(
    'tags/label_registro.html',
    takes_context=False)
def tag_label_registro(_field, _size):

    contexto = {
        'size': _size,
        'campo': _field
    }
    return contexto


@register.inclusion_tag(
    'tags/label_registro_nval.html',
    takes_context=False)
def tag_label_registro_nval(_field, _size):

    contexto = {
        'size': _size,
        'campo': _field
    }
    return contexto


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
