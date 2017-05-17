# -*- coding: utf-8 -*-

# Librerias/Clases Django

from django import forms
from django.utils.html import escape, conditional_escape
from django.utils.encoding import force_unicode

from django.forms import ChoiceField


class SelectWithDescriptions(forms.Select):

    def __init__(self, *args, **kwargs):
        super(SelectWithDescriptions, self).__init__(*args, **kwargs)
        # Ensure the titles dict exists
        self.data_descripcion = {}

    def render_option(self, selected_choices, option_value, option_label):

        try:
            indice_separador = option_label.index(':') + 2
            title_html = u' data-desc="%s" ' % (option_label[indice_separador:])

        except Exception as error:
            print str(error)
            title_html = ""

        option_value = force_unicode(option_value)
        selected_html = (option_value in selected_choices) and u' selected="selected"' or ''
        return u'<option value="%s"%s%s>%s</option>' % (
            escape(option_value), title_html, selected_html,
            conditional_escape(force_unicode(option_label)))


class ChoiceFieldNova(ChoiceField):

    def __init__(self, choices=(), required=True, widget=None, label=None,
                 initial=None, help_text='', *args, **kwargs):
        super().__init__(
            required=required, widget=widget, label=label, initial=initial,
            help_text=help_text, *args, **kwargs
        )
        self.choices = choices
