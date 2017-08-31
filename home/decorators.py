from django.contrib.auth.decorators import user_passes_test


# Decorador para controlar el acceso por medio de GRUPOS
def group_required(login_url=None, raise_exception=False, *group_name):
    def check_group(user):
        if user.groups.filter(name__in=group_name).exists() | user.is_superuser:
            return True
        if raise_exception:
            raise PermissionDenied
        return False
    return user_passes_test(check_group, login_url=login_url)
