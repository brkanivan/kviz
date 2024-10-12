import openai
import random
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Postavi svoj OpenAI API ključ
openai.api_key = 'OPENAI_API_KEY'

app = FastAPI()

# Omogućavanje CORS-a za frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Dopušta zahtjeve sa svih origin-a (za razvoj)
    allow_credentials=True,
    allow_methods=["*"],  # Dozvoli sve HTTP metode
    allow_headers=["*"],  # Dozvoli sva HTTP zaglavlja
)

# Model za zahtjev kviza
class QuizRequest(BaseModel):
    category: str
    grade: int

# Funkcija za generiranje pitanja pomoću GPT-3.5
def generate_question(subject: str, grade: int):
    prompt = f"Generiraj pitanje iz predmeta {subject} za {grade}. razred s tri ponuđena odgovora na hrvatskom jeziku."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    # Dobij tekst iz odgovora
    question_text = response['choices'][0]['message']['content'].strip()

    # Simuliramo generiranje odgovora (može se koristiti i generirani odgovor)
    correct_answer = "."  # Točan odgovor
    wrong_answer_1 = ","
    wrong_answer_2 = ","
    
    # Stavi sve odgovore u listu i promiješaj
    answers = [correct_answer, wrong_answer_1, wrong_answer_2]
    random.shuffle(answers)

    return {
        "question": question_text,
        "answers": answers,
        "correct_answer": correct_answer  # Točan odgovor koji ćemo koristiti za provjeru
    }

# Ruta za generiranje kviza (generira 10 pitanja)
@app.post("/generate_quiz")
def generate_quiz(request: QuizRequest):
    quiz = [generate_question(request.category, request.grade) for _ in range(10)]
    return {"quiz": quiz}
