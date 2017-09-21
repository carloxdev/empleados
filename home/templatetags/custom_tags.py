
# Django's Libraries
import os
from django import template


register = template.Library()


@register.filter('tag_validate_has_group')
def tag_validate_has_group(user, groups_name):
    if groups_name != "":
        if user.is_superuser | \
                user.groups.filter(name="ADMINISTRADOR").exists():
            return True
        else:
            group_list = groups_name.split(',')
            return bool(user.groups.filter(name__in=group_list).values('name'))
    else:
        return True


@register.filter('tag_get_filename')
def tag_get_filename(value):

    return os.path.basename(value.file.name)


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


@register.inclusion_tag('tags/field_registro_dates.html', takes_context=False)
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
    'tags/image_preview.html',
    takes_context=False)
def tag_image_preview(_field, _imagen):

    contexto = {
        'campo': _field,
        'imagen': _imagen,
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
def tag_field_popup_daterangepicker(_etiqueta ,_field1, _field2, _size_group, _size_field1, _size_field2):

    contexto = {
        'etiqueta': _etiqueta,
        'campo1': _field1,
        'campo2': _field2,
        'size_group': _size_group,
        'size_field1': _size_field1,
        'size_field2': _size_field2,
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


@register.inclusion_tag('tags/filter_dates.html', takes_context=False)
def tag_filter_dates(_label, _field1, _field2):

    contexto = {
        'etiqueta': _label,
        'campo1': _field1,
        'campo2': _field2
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
    'tags/filter_radio.html',
    takes_context=False)
def tag_filter_radio(_field):

    contexto = {
        'campo': _field,
    }
    return contexto


@register.inclusion_tag(
    'tags/menu_master.html',
    takes_context=False)
def tag_menu_master(_user):

    contexto = {
        'user': _user,
    }
    return contexto


@register.inclusion_tag('tags/field_descripcion.html', takes_context=False)
def tag_field_descripcion(_label_text, _label_text_size, _label_value, _label_value_size):

    contexto = {
        'label_text': _label_text,
        'label_text_size': _label_text_size,
        'label_value': _label_value,
        'label_value_size': _label_value_size,
    }
    return contexto


@register.inclusion_tag('tags/tag_input.html', takes_context=False)
def tag_input(_field, _size_label, _size_field):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
    }
    return contexto


@register.inclusion_tag('tags/field_checkbox.html', takes_context=False)
def tag_field_checkbox(_field, _name, _size_col):

    contexto = {
        'campo': _field,
        'nombre': _name,
        'size_col': _size_col,
    }
    return contexto


@register.inclusion_tag('tags/tag_image.html', takes_context=False)
def tag_image(_field, _imagen):

    contexto = {
        'campo': _field,
        'imagen': _imagen
    }
    return contexto


@register.inclusion_tag('tags/field_message.html', takes_context=False)
def tag_field_message(_field, _size_label, _size_field, _message):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
        'messages': _message,

    }
    return contexto

@register.inclusion_tag(
    'tags/field_radio.html',
    takes_context=False)
def tag_field_radio(_field, _size_label, _size_field):

    contexto = {
        'campo': _field,
        'size_label': _size_label,
        'size_field': _size_field,
    }
    return contexto
