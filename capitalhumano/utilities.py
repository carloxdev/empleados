# -*- coding: utf-8 -*-
# Librerias Python
import os


def get_FilePath_Expedientes(instance, filename):

    if (instance.doc_id):
        upload_dir = os.path.join(
            'documentosch', str(instance.doc_id), 'files')

    return os.path.join(upload_dir, filename)


