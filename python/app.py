from flask import Flask, request, jsonify
from flask_cors import CORS  
import mysql.connector
from data import database_config

app = Flask(__name__)


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="shrudex",
    database="routeRover"
)

#register section
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    fullname = data['fullname']
    email = data['email']
    password = data['password']
    gender = data['gender']
    dob = data['dob']
    mobile = data['mobile']

    cursor = db.cursor()
    insert_query = "INSERT INTO users (fullname, email, password, gender, dob, mobile) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(insert_query, (fullname, email, password, gender, dob, mobile))
    db.commit()
    cursor.close()
    
    return jsonify({'message': 'User registered successfully'})

#login section
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data['email']
    password = data['password']

    cursor = db.cursor()
    query = "SELECT id, password FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()

    if result is None:
        cursor.close()
        return jsonify({'error': 'User not found'}), 401

    user_id, stored_password = result
    cursor.close()

    if password == stored_password:
        # successful login
        return jsonify({'message': 'Login successful', 'user_id': user_id})

    return jsonify({'error': 'Incorrect password'}), 401
CORS(app)  
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
