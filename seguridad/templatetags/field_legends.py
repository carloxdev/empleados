
# Django's Libraries
from django import template


register = template.Library()


@register.inclusion_tag(
    'tags/leyend_field_optional.html',
    takes_context=False)
def tag_legend_field_optional(field):

    contexto = {
        'campo': field
    }

    return contexto
