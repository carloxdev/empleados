# -*- coding: utf-8 -*-
# Librerias Python
import os


def get_FilePath_Expedientes(instance, filename):

    upload_dir = os.path.join(
        'capitalhumano', 'expedientes', 'Acevedo Escalante Noe')
    print 'Paso x aqui'
    print upload_dir

    return os.path.join(upload_dir, filename)
