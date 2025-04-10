from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db import db
from routes.events import events_bp
from routes.auth import auth_bp
from routes.summary import summary_bp
from routes.tabs import tabs_bp
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://raspberrypi.local"}})

# Use environment variables instead of hardcoding
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret'

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(events_bp)
app.register_blueprint(summary_bp)
app.register_blueprint(tabs_bp)



# Create tables once at startup
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)