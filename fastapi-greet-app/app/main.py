from fastapi import FastAPI, Request
from app.predictor import predictProductCategory
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/greet")
def greet(name: str = "World"):
    return {"message": f"Hello {name}"}

@app.get("/api/predict")
def predict(desc: str = ''):
    """
    Predict product category from description text.
    Expects a query parameter 'description'.
    """
    # description = request.query_params.get('description', '')
    print('here')
    if not desc:
        return {"error": "Description parameter is required."}
    
    category = predictProductCategory(desc)
    return {"category": category}
