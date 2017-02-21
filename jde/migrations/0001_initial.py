# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-20 18:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='F0101',
            fields=[
                ('clave', models.IntegerField(db_column='ABAN8', primary_key=True, serialize=False)),
                ('nombre', models.CharField(db_column='ABALPH', max_length=40)),
                ('tipo', models.CharField(db_column='ABAT1', max_length=3)),
                ('rfc', models.CharField(db_column='ABTAX', max_length=20)),
            ],
            options={
                'db_table': '"CRPDTA"."F0101"',
                'managed': False,
            },
        ),
    ]
