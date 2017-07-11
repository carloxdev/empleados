from django.core.exceptions import ValidationError
 
def valid_extension(value):
    if (not value.name.endswith('.pdf')):
 
        raise ValidationError("Archivos permitidos: .pdf")
