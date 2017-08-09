# -*- coding: utf-8 -*-

# Librerias Django
from __future__ import unicode_literals
from django.db import models

# Librerias Terceros:
from simple_history.models import HistoricalRecords

# Otros Modelos:
from seguridad.models import Profile
from administracion.models import Empresa
from finanzas.models import ViaticoCabecera
from finanzas.models import ViaticoLinea
