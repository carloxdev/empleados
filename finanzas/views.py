from django.shortcuts import render
from django.views.generic import CreateView, DeleteView, UpdateView, ListView
from .forms import ViaticoCabeceraForm, ViaticoLineaForm
from .models import ViaticoCabecera, ViaticoLinea
from django.urls import reverse_lazy
from django.shortcuts import redirect


class ViaticoNuevo(CreateView):
    model = ViaticoCabecera
    second_model = ViaticoLinea
    template_name = 'viatico/viatico_nuevo.html'
    form_class = ViaticoCabeceraForm
    second_form_class = ViaticoLineaForm
    #success_url = reverse_lazy('finanzas:viatico_solicitudes')

    def get_context_data(self, **kwargs):
        context = super(ViaticoNuevo, self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)
        if 'form2' not in context:
            context['form2'] = self.second_form_class(self.request.GET)
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        form = self.form_class(request.POST)
        form2 = self.second_form_class(request.POST)

        if form.isValid():
            viatico
        



class ViaticoLinea(ListView):
    model = ViaticoCabecera
    template_name = 'viatico/viatico_solicitudes.html'
    context_object_name = 'viaticos_solicitudes'
    
    
    