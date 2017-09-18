# # -*- coding: utf-8 -*-
#
# # Django's Libraries
# from __future__ import unicode_literals
# from django.db import models
#
# # Own's Libraries
#
# from seguridad.models import Profile
#
# from home.validators import validate_Extension
# from home.validators import validate_Size
#
# from .utilities import get_ImagePath_Post
#
#
# class Post(models.Model):
#
#     STATUS = (
#         ('PUB', 'PUBLICADO'),
#         ('REC', 'Redactando'),
#     )
#
#     titulo = models.CharField(max_length=120)
#     imagen = models.ImageField(
#         upload_to=get_ImagePath_Post,
#         blank=True,
#         validators=[
#             validate_Extension,
#             validate_Size
#         ]
#     )
#     contenido = models.TextField()
#
#     status = models.CharField(max_length=3, choices=STATUS, default="REC")
#     created_by = models.ForeignKey(Profile, related_name='post_creador', null=True)
#     created_date = models.DateTimeField(auto_now=False, auto_now_add=True)
#     updated_by = models.ForeignKey(Profile, related_name='post_actualizador', null=True)
#     updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)
#
#     def __unicode__(self):
#         return self.titulo
#
#     def __str__(self):
#         return self.titulo
