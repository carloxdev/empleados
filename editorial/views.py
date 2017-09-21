# Django's Libraries
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect

from django.contrib.auth.decorators import login_required

from django.utils.decorators import method_decorator

from django.views.generic.base import View

from django.db.models import Q

from django.core.urlresolvers import reverse
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger

# Own's Libraries
from .models import Post
from .forms import PostForm


class PostPublicados(View):

    def __init__(self):
        self.template_name = 'inicio.html'

    def get(self, request):

        query = request.GET.get('q')
        if query:
            registros = Post.objects.filter(
                Q(titulo__icontains=query) |
                Q(contenido__icontains=query)
            ).order_by("-created_date")
        else:
            registros = Post.objects.filter(status="PUB").order_by("-created_date")

        paginador = Paginator(registros, 10)
        pagina = request.GET.get('page')

        try:
            posts = paginador.page(pagina)
        except PageNotAnInteger:
            posts = paginador.page(1)
        except EmptyPage:
            posts = paginador.page(paginador.num_page)

        contexto = {
            'registros': posts,
        }

        return render(request, self.template_name, contexto)


class PostConsultar(View):

    def __init__(self):
        self.template_name = 'post/post_view.html'

    def get(self, request, pk):

        post = get_object_or_404(Post, pk=pk)

        # owner = Profile.objects.get(is_owner=True)

        contexto = {
            'registro': post
        }

        return render(request, self.template_name, contexto)


@method_decorator(login_required, name='dispatch')
class PostAdministracion(View):

    def __init__(self):
        self.template_name = 'post/post_administracion.html'

    def get(self, request):

        query = request.GET.get('q')
        if query:
            registros = Post.objects.filter(
                Q(titulo__icontains=query) |
                Q(contenido__icontains=query)
            ).order_by("-created_date")
        else:
            registros = Post.objects.all().order_by("-created_date")

        paginador = Paginator(registros, 10)
        pagina = request.GET.get('page')

        try:
            posts = paginador.page(pagina)
        except PageNotAnInteger:
            posts = paginador.page(1)
        except EmptyPage:
            posts = paginador.page(paginador.num_page)

        contexto = {
            'registros': posts
        }

        return render(request, self.template_name, contexto)


@method_decorator(login_required, name='dispatch')
class PostNuevo(View):

    def __init__(self):
        self.template_name = 'post/post_form.html'
        self.operation = "Nuevo"

    def get(self, request):

        formulario = PostForm()
        contexto = {
            'form': formulario,
            'operacion': self.operation
        }

        return render(request, self.template_name, contexto)

    def post(self, request):

        formulario = PostForm(request.POST, request.FILES)

        if formulario.is_valid():
            post = formulario.save(commit=False)

            post.created_by = request.user.profile
            post.updated_by = request.user.profile

            post.save()

            return redirect(reverse('editorial:post_administracion'))

        contexto = {
            'form': formulario,
            'operacion': self.operation
        }
        return render(request, self.template_name, contexto)


@method_decorator(login_required, name='dispatch')
class PostEditar(View):

    def __init__(self):
        self.template_name = 'post/post_form.html'
        self.operation = "Editar"

    def get(self, request, pk):

        post = get_object_or_404(Post, pk=pk)

        formulario = PostForm(
            instance=post
        )

        contexto = {
            'form': formulario,
            'operacion': self.operation
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)

        formulario = PostForm(
            request.POST,
            request.FILES,
            instance=post
        )

        if formulario.is_valid():

            post = formulario.save(commit=False)
            post.updated_by = request.user.profile

            post.save()

            return redirect(reverse('editorial:post_administracion'))

        contexto = {
            'form': formulario,
            'operacion': self.operation
        }
        return render(request, self.template_name, contexto)
