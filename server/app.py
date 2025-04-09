from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db import db
from routes.events import events_bp
from routes.auth import auth_bp  # if using auth
import os

app = Flask(__name__)
CORS(app)

# Configs
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Greyshin9@localhost:5432/pos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret'

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(events_bp)
app.register_blueprint(auth_bp)

@app.before_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
