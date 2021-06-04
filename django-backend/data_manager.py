import re
import os
import glob
import nltk
import random
import pickle
import argparse
import numpy as np

from sklearn import preprocessing

from tensorflow.data import Dataset
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


class DataManager():
    def __init__(self, path, train_ratio=0.8, verbose=False, vocab_size=5000, encoding='utf8'):
        # nltk.download('punkt')
        if len(path) <= 0:
            raise AttributeError('Invalid dataset path.')
        self.path = path
        self.verbose = verbose
        self.train_ratio = train_ratio
        self.vocab_size = vocab_size
        self.encoding = encoding
        self.texts = []
        self.sentences = []
        self.labels = []
        self.load_text_files()
        self.encode_labels()
        self.tokenize()
        self.train_valid_split()
        with open("tf_tokenizer.pkl", "wb") as pkl_file:
            pickle.dump(self.tokenizer, pkl_file)
    
    def split_into_sentences(self, text):
        alphabets= "([A-Za-z])"
        prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
        suffixes = "(Inc|Ltd|Jr|Sr|Co)"
        starters = "(Mr|Mrs|Ms|Dr|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
        acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
        websites = "[.](com|net|org|io|gov)"

        text = " " + text + "  "
        text = text.replace("\n"," ")
        text = re.sub(prefixes,"\\1<prd>",text)
        text = re.sub(websites,"<prd>\\1",text)
        if "Ph.D" in text: text = text.replace("Ph.D.","Ph<prd>D<prd>")
        text = re.sub("\s" + alphabets + "[.] "," \\1<prd> ",text)
        text = re.sub(acronyms+" "+starters,"\\1<stop> \\2",text)
        text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
        text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
        text = re.sub(" "+suffixes+"[.] "+starters," \\1<stop> \\2",text)
        text = re.sub(" "+suffixes+"[.]"," \\1<prd>",text)
        text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
        if "”" in text: text = text.replace(".”","”.")
        if "\"" in text: text = text.replace(".\"","\".")
        if "!" in text: text = text.replace("!\"","\"!")
        if "?" in text: text = text.replace("?\"","\"?")
        text = text.replace(".",".<stop>")
        text = text.replace("?","?<stop>")
        text = text.replace("!","!<stop>")
        text = text.replace("<prd>",".")
        sentences = text.split("<stop>")
        sentences = sentences[:-1]
        sentences = [s.strip() for s in sentences]
        return sentences
    
    def load_text_files(self):
        tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
        for classes in glob.glob(os.path.join(self.path, "*")):
            for text in glob.glob(os.path.join(classes, "*")):
                self.labels.append(os.path.basename(classes))
                text = open(text, encoding=self.encoding).read().lower()
                self.texts.append(text)
                text = tokenizer.tokenize(text)
                self.sentences.append(text[: 100])

    def encode_labels(self):
        le = preprocessing.LabelEncoder()
        self.class_id = le.fit_transform(self.labels)
        self.labels = le.classes_
        self.num_classes = len(self.labels)
        self.max_sentence_number = max(map(lambda sentence: len(sentence), self.sentences))
        self.max_sentence_number = 100
        if self.verbose:
            print("\nSample questions...\n")
            for i in range(5):
                print('\n'.join(self.sentences[i]))
                print('--------------------------------------------------------')
            print("Labels{}\n\n".format(self.labels))

    def tokenize(self):
        self.tokenizer = Tokenizer(self.vocab_size)
        self.tokenizer.fit_on_texts(self.texts)
        self.tokens = [self.tokenizer.texts_to_sequences(self.sentences[i]) for i in range(len(self.sentences))]
        max_array = [list(map(lambda sentence: len(sentence), text)) for text in self.tokens]
        self.maxlen = max(max(max_array))
        self.maxlen = 30
        self.tokens = [pad_sequences(self.tokens[i], padding='post', truncating='post', value=0, maxlen=self.maxlen) for i in range(len(self.tokens))]
        for i in range(len(self.tokens)):
            if self.tokens[i].shape[0] < self.max_sentence_number:
                for _ in range(self.max_sentence_number - self.tokens[i].shape[0]):
                    self.tokens[i] = np.append(self.tokens[i], [np.zeros(self.maxlen)], 0)
        self.word2idx = self.tokenizer.word_index
        self.vocab_size = len(self.word2idx)

    def train_valid_split(self):
        idxs = np.random.permutation(len(self.tokens))
        train_size = int(self.train_ratio * len(idxs)) + 1
        self.tokens = np.asarray(self.tokens)[idxs]
        self.class_id = np.asarray(self.class_id)[idxs]
        self.train_tokens, self.valid_tokens = self.tokens[:train_size], self.tokens[train_size:]
        self.train_classes, self.valid_classes = self.class_id[:train_size], self.class_id[train_size:]
        self.train_tokens = np.asarray(self.train_tokens)
        self.valid_tokens = np.asarray(self.valid_tokens)
        # print(self.train_tokens.shape, len(self.train_classes))
        # self.train_set = Dataset.from_tensor_slices((train_tokens, train_classes))
        # self.val_set = Dataset.from_tensor_slices((valid_tokens, valid_classes))

    def predict_preprocess(self, input_texts, tf_tokenizer_path):
        tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
        texts = []
        sentences = []
        for text in input_texts:
            texts.append(text)
            text = tokenizer.tokenize(text)
            sentences.append(text[:100])
        # with open(tf_tokenizer_path, 'rb') as pkl_read:
        #     self.tokenizer = pickle.load(pkl_read)
        tokens = [self.tokenizer.texts_to_sequences(sentences[i]) for i in range(len(sentences))]
        # max_array = [list(map(lambda sentence: len(sentence), text)) for text in tokens]
        # maxlen = max(max(max_array))
        self.maxlen = 30
        self.max_sentence_number = 100
        tokens = [pad_sequences(tokens[i], padding='post', truncating='post', value=0, maxlen=self.maxlen) for i in range(len(tokens))]
        for i in range(len(tokens)):
            if tokens[i].shape[0] < self.max_sentence_number:
                for _ in range(self.max_sentence_number - tokens[i].shape[0]):
                    tokens[i] = np.append(tokens[i], [np.zeros(self.maxlen)], 0)
        return np.asarray(tokens)


def sys_args():
    parser = argparse.ArgumentParser(description='Script to load dataset.')
    parser.add_argument('path', help='Path to the dataset folder.')
    parser.add_argument('-t', '--train-ratio', type=float, default=0.9, help='Ratio to split the dataset into train and validation parts. (Default = 0.9)')
    parser.add_argument('-v', '--verbose', default=False, action='store_true', help='Whether or not to turn on the verbose when loading dataset. (Default = False)')
    return parser.parse_args()

