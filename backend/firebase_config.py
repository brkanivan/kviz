import firebase_admin
from firebase_admin import credentials, firestore

# Postavljanje Firebase-a
cred = credentials.Certificate("")  # zamijeni s putanjom do svoje datoteke
firebase_admin.initialize_app(cred)
db = firestore.client()
