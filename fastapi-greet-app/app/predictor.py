
import pandas as pd
import re
import nltk
import joblib

# Download required NLTK data
nltk.download('stopwords')
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))

# Define paths
folder = 'app/models'

# Load trained models and vectorizer
model = joblib.load(f'{folder}/hazard_classification_model.pkl')
tfidf = joblib.load(f'{folder}/tfidf_vectorizer.pkl')
label_map = joblib.load(f'{folder}/label_map.pkl')

def preprocess(text):
    """Clean and preprocess text data"""
    text = text.lower()
    text = re.sub(r'\d+', '', text)  # Remove digits
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    text = re.sub(r'<[^>]+>', '', text)  # Remove HTML tags
    tokens = text.split()
    tokens = [word for word in tokens if word not in stop_words]  # Remove stopwords
    return ' '.join(tokens)

def predictProductCategory(description):
    """Predict product category from description text"""
    # Preprocess the input description
    cleaned_text = preprocess(description)
    
    # Transform text using trained TF-IDF vectorizer
    X = tfidf.transform([cleaned_text]).toarray()
    
    # Make prediction using trained model
    y_pred = model.predict(X)
    
    # Create reverse label mapping and decode prediction
    inv_label_map = {v: k for k, v in label_map.items()}
    category = inv_label_map[int(y_pred[0])]
    
    return category
