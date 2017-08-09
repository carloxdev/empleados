
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


@register.inclusion_tag(
    'tags/field_popup.html',
    takes_context=False)
def tag_field_popup(_field, _size_label, _size_field):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
    }
    return contexto


@register.inclusion_tag(
    'tags/field_popup_datepicker.html',
    takes_context=False)
def tag_field_popup_datepicker(_field, _size_label, _size_field, _input_group_id):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
        'input_group_id': _input_group_id,
    }
    return contexto


@register.inclusion_tag(
    'tags/field_popup_filter.html',
    takes_context=False)
def tag_field_popup_filter(_field, _size_col):

    contexto = {
        'campo': _field,
        'size_col': _size_col,
    }
    return contexto


@register.inclusion_tag(
    'tags/field_popup_daterangepicker.html',
    takes_context=False)
def tag_field_popup_daterangepicker(_field, _size_group):

    contexto = {
        'campo': _field,
        'size_group': _size_group,
    }
    return contexto


@register.inclusion_tag(
    'tags/field_popup_radio_button.html',
    takes_context=False)
def tag_field_popup_radio_button(_field, _size_col):

    contexto = {
        'campo': _field,
        'size_col': _size_col,
    }
    return contexto


@register.inclusion_tag(
    'tags/field.html',
    takes_context=False)
def tag_field(_field, _size_label, _size_field):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
    }
    return contexto
