from flask import Flask
from flask_cors import CORS
from db import db
from models.user import User  # 👈 must import the model to register it
from routes.auth import auth_bp  # your auth routes

app = Flask(__name__)
CORS(app)

# 👇 use your actual DB info here
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Greyshin9@localhost:5432/pos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
app.register_blueprint(auth_bp)

# 👇 creates tables before first request (only if they don't exist)
@app.before_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
