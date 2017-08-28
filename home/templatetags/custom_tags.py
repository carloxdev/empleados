
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
    'tags/field_registro_dates.html',
    takes_context=False)
def tag_field_registro_dates(_label, _field1, _field2, _size_label, _size_field1, _size_field2):

    contexto = {
        'etiqueta': _label,
        'campo1': _field1,
        'campo2': _field2,
        'size_label': _size_label,
        'size_field1': _size_field1,
        'size_field2': _size_field2
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
def tag_field_popup_datepicker(_field, _size_label, _size_field, _set_label):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
        'set_label': _set_label
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


@register.inclusion_tag(
    'tags/field_date.html',
    takes_context=False)
def tag_field_date(_field, _size_label, _size_field, _set_label):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
        'set_label': _set_label,
    }
    return contexto


@register.inclusion_tag('tags/section_info.html', takes_context=False)
def tag_section_info(_size, _offset, _type, _message):

    contexto = {
        'size': _size,
        'offset': _offset,
        'type': _type,
        'message': _message
    }
    return contexto


@register.inclusion_tag('tags/mensaje.html', takes_context=False)
def tag_mensaje(_type, _message):

    contexto = {
        'type': _type,
        'message': _message
    }
    return contexto

@register.inclusion_tag(
    'tags/field_popup_apuntador.html',
    takes_context=False)
def tag_field_popup_apuntador(_field, _apuntador):

    contexto = {
        'campo': _field,
        'apuntador': _apuntador,
    }
    return contexto

@register.inclusion_tag(
    'tags/filter_group.html',
    takes_context=False)
def tag_filter_group(_field, _apuntador):

    contexto = {
        'campo': _field,
        'apuntador': _apuntador,
    }
    return contexto

@register.filter('has_group')
def has_group(user, group_name):
    if user.is_superuser:
        return True
    else:
        groups = user.groups.all().values_list('name', flat=True)
        return True if group_name in groups else False
