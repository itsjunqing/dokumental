# Dokumental: Backend 

This repository serves the django (backend) components of the project. 

## How to run
<b>Ensure that all [prerequisites](../README.md/#project-prerequisites) are installed accordingly.<br></b>

1. Create a virtual environment manually
```
python3 -m venv venv/
```

2. Activate the virtual environment (for Unix-based)
```
source venv/bin/activate
```

3. Install the required dependencies
```
pip install -r requirements.txt
```

> Note: This file of `requirements.txt` contains all the necessary packages (including its dependencies) required to launch the application successfully. If there are dependency conflicts, the system admin may be required to manually resolve them.

4. Perform Django migrations
```
python3 manage.py makemigrations
python3 manage.py migrate
```

5. Launch the server
```
python manage.py runserver
```

> Note: The launching of the server may take some time (depending on the machine’s processing power) as the server automatically starts up the connection (loading) of the classification model, to reduce the time taken required to run the model in obtaining the classification results.

6. Navigate to the HTTP address of (`localhost:3000``) as per [Frontend Setup](/frontend/README.md) to view the web app and begin using the web app.


## Classification Model Download
Due to GitHub's limitation of files of 100MB and above, the classification model is hosted separately on [Dropbox](https://www.dropbox.com/sh/l534p3v9u2vsghx/AABLtm7nd3ZRCiqyCKyjjbrza?dl=0) where the files are downloaded upon the launch of the server as per initialization [here](./manage.py). 


## API Invokation
The endpoint can (also) be invoked manually through the endpoint of `uploads/`. For example: 

1. Access `http://localhost:8000/uploads/`
2. Switch HTTP Method to `POST`
3. Select `Body` tab
4. Select `form-data` tab
5. Enter key as "`file`" and switch the type to `File` and select the files from `samplefiles/` directory 

