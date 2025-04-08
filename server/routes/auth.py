from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

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

    # Checks receipt and see if it is what i got?
    if username == TEST_USER['username'] and password == TEST_USER['password']:
        return jsonify({
            'token': 'fake-jwt-token',
            'role': TEST_USER['role']
        }), 200
    # Gets sent back to React as response.data to either say that it was correct or not
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
