from flask import Blueprint, request, jsonify
from models.user import User
from db import db
from flask_bcrypt import Bcrypt
auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# For now, a hardcoded test user
TEST_USER = {
    'username': 'admin',
    'password': 'password123',
    'role': 'admin'
}

@auth_bp.route('/login', methods=['POST']) # Is URLPATH /login and is METHOD=post? if true then run
def login():
    data = request.json # Receives the package

    # Take out the things in package
    username = data.get('username')
    password = data.get('password')
    print("Login attempt:", username, password)

    # Checks receipt and see if it is what i got?
    # Find user by username
    user = User.query.filter_by(username=username).first()
    if not user:
        print("User not found")
        return jsonify({'message': 'Invalid username or password'}), 401

    if bcrypt.check_password_hash(user.password, password):
        print("Login successful")
        return jsonify({
            'token': 'fake-jwt-token',
            'role': user.role,
            'username': user.username
        }), 200
    else:
        print("Password incorrect")
        return jsonify({'message': 'Invalid username or password'}), 401
