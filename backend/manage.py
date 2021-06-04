#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import requests, zipfile
from io import BytesIO

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'doku.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


def initMain():
    if os.path.exists('model'):
        return False

    url = "https://www.dropbox.com/sh/l534p3v9u2vsghx/AABLtm7nd3ZRCiqyCKyjjbrza?dl=1"
    print('Downloading model from Dropbox...')
    req = requests.get(url)
    print('Model download completed')

    with zipfile.ZipFile(BytesIO(req.content)) as zip_file:
        zip_file.extractall('model') # extract into the `model/` path
    return True

if __name__ == '__main__':
    initMain()
    main()
