# Python's Libraries
from itertools import chain

# Django's Libraries
from django.forms.widgets import ChoiceWidget
from django.utils import six
from django.utils.encoding import force_text


class ChoiceWidgetCustom(ChoiceWidget):

    def optgroups(self, name, value, attrs=None):
        """Return a list of optgroups for this widget."""
        groups = []
        has_selected = False

        for index, (option_value, option_label, option_text, option_status) in enumerate(chain(self.choices)):
            if option_value is None:
                option_value = ''

            subgroup = []
            if isinstance(option_label, (list, tuple)):
                group_name = option_value
                subindex = 0
                choices = option_label
            else:
                group_name = None
                subindex = None
                choices = [(option_value, option_label)]
            groups.append((group_name, subgroup, index))

            for subvalue, sublabel in choices:
                selected = (
                    force_text(subvalue) in value and
                    (has_selected is False or self.allow_multiple_selected)
                )
                if selected is True and has_selected is False:
                    has_selected = True
                subgroup.append(self.create_option(
                    name,
                    subvalue,
                    sublabel,
                    option_text,
                    option_status,
                    selected,
                    index,
                    subindex=subindex,
                    attrs=attrs,
                ))
                if subindex is not None:
                    subindex += 1
        return groups

    def create_option(self,
                      name,
                      value,
                      label,
                      text,
                      status,
                      selected,
                      index,
                      subindex=None,
                      attrs=None):
        index = str(index) if subindex is None else "%s_%s" % (index, subindex)
        if attrs is None:
            attrs = {}
        option_attrs = self.build_attrs(
            self.attrs, attrs) if self.option_inherits_attrs else {}
        if selected:
            option_attrs.update(self.checked_attribute)
        if 'id' in option_attrs:
            option_attrs['id'] = self.id_for_label(option_attrs['id'], index)
        return {
            'name': name,
            'value': force_text(value),
            'label': label,
            'text': text,
            'status': status,
            'selected': selected,
            'index': index,
            'attrs': option_attrs,
            'type': self.input_type,
            'template_name': self.option_template_name,
        }


class SelectCustom(ChoiceWidgetCustom):

    input_type = 'select'
    template_name = 'django/forms/widgets/select.html'
    # option_template_name = 'django/forms/widgets/select_option_custom.html'
    option_template_name = 'forms_fields/select_option_custom.html'
    add_id_index = False
    checked_attribute = {'selected': True}
    option_inherits_attrs = False

    def get_context(self, name, value, attrs):
        context = super(SelectCustom, self).get_context(name, value, attrs)
        if self.allow_multiple_selected:
            context['widget']['attrs']['multiple'] = 'multiple'
        return context

    @staticmethod
    def _choice_has_empty_value(choice):
        # import ipdb; ipdb.set_trace()
        """Return True if the choice's value is empty string or None."""
        value, _, _, _, = choice
        return (
            (isinstance(value, six.string_types) and not bool(value)) or
            value is None
        )

    def use_required_attribute(self, initial):
        """
        Don't render 'required' if the first <option> has a value, as that's
        invalid HTML.
        """
        use_required_attribute = super(
            SelectCustom,
            self
        ).use_required_attribute(initial)
        # 'required' is always okay for <select multiple>.
        if self.allow_multiple_selected:
            return use_required_attribute

        first_choice = next(iter(self.choices), None)
        return use_required_attribute and first_choice is not None and self._choice_has_empty_value(first_choice)
