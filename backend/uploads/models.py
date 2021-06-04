from django.db import models

# Create your models here.

class UserUpload(models.Model):
	files = models.FileField(upload_to='media/', blank=True, null=True)
