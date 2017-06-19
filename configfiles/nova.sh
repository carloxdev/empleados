#! /bin/bash


NAME="nova"                                  # Name of the application
DJANGODIR=/webapps/nova/test/Sitio             # Django project directory
SOCKFILE=/webapps/nova/test/run/nova.sock
USER=goxcon                                        # the user to run as
GROUP=goxcon                                     # the group to run as
NUM_WORKERS=3                                     # how many worker processes should Gunicorn spawn
DJANGO_SETTINGS_MODULE=Nova.settings             # which settings file should Django use
DJANGO_WSGI_MODULE=Nova.wsgi                     # WSGI module name

echo "Starting $NAME as 'nova'"

# Activate the virtual environment
cd $DJANGODIR
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec ../../envlnx/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user $USER \
  --bind=unix:$SOCKFILE

  
