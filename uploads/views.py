from django.shortcuts import render
from django.views.generic.edit import FormView
from .forms import UserUploadForm
from .models import UserUpload
from django.core.files.storage import FileSystemStorage
# Create your views here.

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response

import textract
from model.classifier import run_model

from timeit import default_timer as timer
import os

def extract_texts(files):
	"""
	Function to extract text from a list of files
	"""
	arr = []
	for file in files:
		fs = FileSystemStorage()
		file_uploaded = fs.save(file.name, file)
		file_path = os.path.join(fs.location, file_uploaded)
		print(f'File = {file} is saved at {fs.base_url}...')

		text = textract.process(file_path)
		text = text.decode('utf-8')
		arr.append(text)
		
		fs.delete(file_path)
		print(f'File = {file} is removed from {fs.base_url}...')
	return arr


@csrf_exempt 
def upload_files(request):
	print("Uploading files...")
	if request.method == 'POST':
		form = UserUploadForm(request.POST, request.FILES)
		files = request.FILES.getlist('file')
		
		if form.is_valid():
			# Wrong file indication
			if len(files) == 0:
				return HttpResponse("Please indicate upload file field as 'file'", status=400)
			start_time = timer()
			# Extract the text from the files
			arr_of_texts = extract_texts(files)
			
			# Run the model to get the result, in the format of a list of tuple (level, percentages)
			results = run_model(arr_of_texts)
			print(f'Result = {results}')
			end_time = timer()

			print(f'Total time to process = {round(end_time - start_time, 4)}')
			# Parse into return JSON format
			upload_results = []
			for i in range(len(results)):
				if len(arr_of_texts[i]) > 0:
					temp_res = {
						"name": files[i].name,
						"level": results[i][0],
						"percentages": results[i][1]
					}
					upload_results.append(temp_res)
				else:
					temp_res = {
						"name": files[i].name,
						"level": "Fail",
						"description": "File is empty"
					}
					upload_results.append(temp_res)
			
			return JsonResponse(upload_results, safe=False)

	return Response("Unable to upload files", status=status.HTTP_403_FORBIDDEN)


	
