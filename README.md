# Dokumental - Django Backend 

This repository serves the back-end component of the document classification project - namely Dokumental. It serves the integration component between the classification model and front-end. 

### How to run server
1. Ensure pip is install 
2. Switch environment by invoking `source env/bin/activate`
3. Install pip packages: `pip install -r requirements.txt`
4. Run `python manage.py runserver`

**Invoke API with Postman**
1. Access `http://localhost:8000/uploads/`
2. Switch HTTP Method to `POST`
3. Select `Body` tab
4. Select `form-data` tab
5. Enter key as "`file`" and switch the type to `File` and select the files from `samplefiles/` directory 

