# LogicLoom FastAPI

A machine learning-powered FastAPI application that predicts product hazard categories from text descriptions. This project combines a FastAPI backend with a React frontend to provide real-time product category classification.

## 🚀 Features

- **Product Category Prediction**: Predict hazard categories for products based on their text descriptions
- **RESTful API**: Clean and simple API endpoints for integration
- **Text Preprocessing**: Advanced NLP preprocessing using NLTK (stopword removal, text cleaning)
- **Machine Learning**: Pre-trained XGBoost model with TF-IDF vectorization
- **CORS Enabled**: Ready for cross-origin requests from frontend applications
- **Dockerized**: Easy deployment with Docker containers

## 📋 API Endpoints

###  Product Category Prediction
```
GET /api/predict?desc={description}
```
Predicts the product hazard category based on the provided description.

**Parameters:**
- `desc` (required): Product description text

**Example:**
```bash
curl "http://localhost:8000/api/predict?desc=battery%20powered%20toy"
```
**Response:**
```json
{
  "category": "Electrical Hazard"
}
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.11**: Programming language
- **scikit-learn**: Machine learning library
- **XGBoost**: Gradient boosting framework
- **NLTK**: Natural Language Toolkit for text processing
- **joblib**: Model serialization
- **pandas**: Data manipulation
- **uvicorn**: ASGI server

### Frontend
- **React**: JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling

### Models
- **Hazard Classification Model**: Pre-trained XGBoost model
- **TF-IDF Vectorizer**: Text feature extraction
- **Label Mapping**: Category encoder/decoder

## 📁 Project Structure

```
logicloom-fastapi/
├── fastapi-greet-app/
│   ├── app/
│   │   ├── main.py              # FastAPI application and routes
│   │   ├── predictor.py         # ML prediction logic and preprocessing
│   │   └── models/              # Pre-trained ML models
│   │       ├── hazard_classification_model.pkl
│   │       ├── tfidf_vectorizer.pkl
│   │       └── label_map.pkl
│   ├── Dockerfile               # Docker configuration for backend
│   ├── requirements.txt         # Python dependencies
│   └── render.yaml             # Deployment configuration
├── frontend/
│   └── product_predict/        # React frontend application
└── README.md                   # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Python 3.11 or higher
- Node.js (for frontend)
- Docker (optional, for containerized deployment)

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/HarshitSahu01/logicloom-fastapi.git
cd logicloom-fastapi/fastapi-greet-app
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Docker Deployment

Build and run using Docker:
```bash
cd fastapi-greet-app
docker build -t logicloom-fastapi .
docker run -p 8000:8000 logicloom-fastapi
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend/product_predict
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## 🧠 How the Predictor Works

The product category predictor uses a multi-step pipeline:

1. **Text Preprocessing** (`preprocess` function):
   - Converts text to lowercase
   - Removes digits
   - Removes punctuation and special characters
   - Removes HTML tags
   - Removes English stopwords (using NLTK)
   - Tokenizes and rejoins text

2. **Feature Extraction**:
   - Uses pre-trained TF-IDF (Term Frequency-Inverse Document Frequency) vectorizer
   - Converts cleaned text into numerical features

3. **Prediction**:
   - Uses pre-trained XGBoost classification model
   - Maps numerical predictions back to category labels using label mapping

4. **Output**:
   - Returns the predicted product hazard category

## 🔑 Key Components

### `main.py`
- FastAPI application initialization
- CORS middleware configuration
- API route definitions
- Request handling and validation

### `predictor.py`
- Model loading (XGBoost model, TF-IDF vectorizer, label mapping)
- Text preprocessing function
- Product category prediction function
- NLTK stopwords initialization

## 📊 Dependencies

See `requirements.txt` for full list:
- fastapi
- uvicorn
- joblib
- pandas
- nltk
- xgboost
- scikit-learn

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Harshit Sahu**
- GitHub: [@HarshitSahu01](https://github.com/HarshitSahu01)

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- scikit-learn and XGBoost for machine learning capabilities
- NLTK for natural language processing tools
