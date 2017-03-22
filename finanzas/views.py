from django.views.generic import CreateView
from django.views.generic import ListView
from .forms import ViaticoCabeceraForm, ViaticoLineaForm
from .models import ViaticoCabecera, ViaticoLinea


class ViaticoNuevo(CreateView):
    model = ViaticoCabecera
    second_model = ViaticoLinea
    template_name = 'viatico/viatico_nuevo.html'
    form_class = ViaticoCabeceraForm
    second_form_class = ViaticoLineaForm

    def get_context_data(self, **kwargs):
        context = super(ViaticoNuevo, self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)
        if 'form2' not in context:
            context['form2'] = self.second_form_class(self.request.GET)
        return context


class ViaticoLinea(ListView):
    model = ViaticoCabecera
    template_name = 'viatico/viatico_solicitudes.html'
    context_object_name = 'viaticos_solicitudes'
