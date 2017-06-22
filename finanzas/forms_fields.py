# -*- coding: utf-8 -*-

# Librerias/Clases Django

from django import forms
from django.utils.html import escape, conditional_escape
from django.utils.html import format_html
from django.utils.encoding import force_unicode
from django.utils.encoding import force_text

# from django.forms import ChoiceField


class SelectNova(forms.Select):

    def render_option(self,
                      selected_choices,
                      option_value,
                      option_label,
                      option_text,
                      option_status,
                      option_status_desc):

        option_value = force_unicode(option_value)
        data_desc = u' data-text="%s" ' % (option_text)
        data_status = u' data-status="%s" ' % (option_status)
        data_status_desc = u' data-status-desc="%s" ' % (option_status_desc)
        selected_html = (option_value in selected_choices) and u' selected="selected"' or ''
        return u'<option value="%s"%s%s%s%s>%s</option>' % (
            escape(option_value),
            data_desc,
            data_status,
            data_status_desc,
            selected_html,
            conditional_escape(force_unicode(option_label))
        )

    def render_options(self, selected_choices):

        # Normalize to strings.
        selected_choices = set(force_text(v) for v in selected_choices)
        output = []

        for option_value, option_label, option_text, option_status, option_status_desc in self.choices:
            if isinstance(option_label, (list, tuple)):
                output.append(format_html('<optgroup label="{}">', force_text(option_value)))
                for option in option_label:
                    output.append(self.render_option(selected_choices, *option))
                output.append('</optgroup>')
            else:
                output.append(self.render_option(
                    selected_choices,
                    option_value,
                    option_label,
                    option_text,
                    option_status,
                    option_status_desc,
                ))
        return '\n'.join(output)
