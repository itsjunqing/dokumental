from django import forms
from django.forms import ClearableFileInput
from .models import UserUpload

class UserUploadForm(forms.ModelForm):
	class Meta:
		model = UserUpload
		fields = ['files']
		widgets = {
			'files': ClearableFileInput(attrs={'multiple': True}),
    }
