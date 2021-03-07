import os
import argparse
import re
import pickle
import numpy as np
import tensorflow as tf
from tensorflow import keras
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer


def parse():
    """"
    function to get the input document from command line and return it
    """
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--document", dest="filename", default=False, help="The test directory for this program")
    parser.add_argument("-t", "--text", dest="text", default=False, help="Directly enter the text in terminal")
    parser.add_argument("vectorizer", help="Pretrained vectorizer to vectorize the input text")
    args = parser.parse_args()
    return args


def cleanhtml(raw_html):
    """
    function to clean the HTML tag and remove hyphen
    """
    cleanr = re.compile('<.*?>|\/|-')
    cleantext = re.sub(cleanr, ' ', raw_html)
    return cleantext


def read_file(filename):
    """
    function to read the text from file
    """
    file = open(filename, encoding="latin")
    text = file.read()
    file.close()
    return text


def document_preprocessing(text, class_labels, vectorizer):
    """
    function to use the model to predict the readablity of the given text
    """
    # Stem the words
    porter = PorterStemmer()
    o = []
    for word in word_tokenize(cleanhtml(text)):
        if word.isalnum():
            o.append(porter.stem(word))
    input = " ".join(o)

    # Vectorize the text
    # vectorizer = TfidfVectorizer(encoding="latin", strip_accents="unicode", max_features=10000)
    input = vectorizer.transform([input])

    # Convert to TensorFlow SparseTensor
    input = input.tocoo()
    input_tensor = tf.SparseTensor(np.array([input.row, input.col]).T, values=input.data, dense_shape=input.shape)
    input_tensor = tf.sparse.reorder(input_tensor)


    path = os.path.abspath(__file__) # full path of your script
    dir_path = os.path.dirname(path) # full path of the directory of your script
    model_path = os.path.join(dir_path,'Prototype_model.h5') # absolute zip file path

    model = keras.models.load_model(model_path)
    probability = model.predict(input_tensor)

    predicted_class = class_labels[np.argmax(probability)]

    # need further modification
    percentages = probability.tolist()

    return predicted_class, percentages


def main():
    """
    main function
    """
    arguments = parse()
    if arguments.filename:
        text = read_file(arguments.filename)
    elif arguments.text:
        text = arguments.text
    else:
        return "No input is given"
    
    with open(arguments.vectorizer, 'rb') as r:
        vectorizer = pickle.load(r)
    labels = ['Elementary school', 'High school', 'Postgraduate', 'Secondary school', 'Undergraduate']
    print(document_preprocessing(text, labels, vectorizer))


def run_model(text):
    vectorizer_file = "vectorizer.bin"
    path = os.path.abspath(__file__) # full path of your script
    dir_path = os.path.dirname(path) # full path of the directory of your script
    vectorizer_file_path = os.path.join(dir_path,'vectorizer.bin') # absolute zip file path

    with open(vectorizer_file_path, 'rb') as r:
        vectorizer = pickle.load(r) # loading the pickled (saved) classification model
    labels = ['Readability Level: Elementary school', 
                'Readability Level: High school', 
                'Readability Level: Postgraduate', 
                'Readability Level: Secondary school', 
                'Readability Level: Undergraduate']
    
    return document_preprocessing(text, labels, vectorizer)

# if __name__ == "__main__":
#     run_model("test")