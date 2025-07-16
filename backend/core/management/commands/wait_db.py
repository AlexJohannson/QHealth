import time

from django.core.management.base import BaseCommand
from django.db import OperationalError, connection
from django.db.backends.mysql.base import DatabaseWrapper

connection: DatabaseWrapper = connection
class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        con_dn = False

        while not con_dn:
            try:
                connection.ensure_connection()
                con_dn = True
            except OperationalError:
                self.stdout.write('Database unavailable, wait 3 seconds...')
                time.sleep(3)

        self.stdout.write(self.style.SUCCESS('Database available!'))