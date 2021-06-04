"""
THIS FILE PERFORMS SETUP ON INITIALIZING THE MODEL UPON START UP
"""

import os
import tensorflow as tf
from tensorflow import keras
from data_manager import DataManager
import numpy as np


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

dir_path = os.path.abspath('.')
dm_path = dir_path + "/tmp"
model_path = dir_path + "/model/actual/epoch_03-val_acc_0.87" # BiGRU load architecture (TensorFlow model)

# Loading the data manager
print("From StartupConfig: Loading data manager...")
dm = DataManager(dm_path, encoding="latin")
dm.labels = np.asarray(["Elementary School", "Middle School", "High School", "Undergraduate"])

# Loading the trained model
print("From StartupConfig: Loading model...")
model = tf.keras.models.load_model(model_path)
