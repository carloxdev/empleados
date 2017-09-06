from django.contrib.auth.decorators import user_passes_test
from django.core.exceptions import PermissionDenied

# Decorador para controlar el acceso por medio de GRUPOS


def group_required(*group_name):
    def check_group(user):
        if user.groups.filter(name__in=group_name).exists() | \
                user.is_superuser | \
                user.groups.filter(name="ADMINISTRADOR").exists():
            return True
        raise_exception = True
        if raise_exception:
            raise PermissionDenied
    return user_passes_test(check_group)
