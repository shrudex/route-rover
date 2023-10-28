from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from data import database_config
from datetime import timedelta
import json

app = Flask(__name__)

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, timedelta):
            return str(obj)   
        return super().default(obj)

app.json_encoder = CustomJSONEncoder

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

@app.route('/trains', methods=['GET'])
@app.route('/trains', methods=['GET'])
def get_trains():
    cursor = db.cursor(dictionary=True)
    search_option = request.args.get('searchOption')
    from_station = request.args.get('from')
    to_station = request.args.get('to')
    name = request.args.get('name')
    number = request.args.get('number')

    if search_option == "SEARCH by station":
        query = "SELECT * FROM trainList WHERE origin = %s AND destination = %s"
        cursor.execute(query, (from_station, to_station))
    elif search_option == "SEARCH by name":
        query = "SELECT * FROM trainList WHERE name = %s"
        cursor.execute(query, (name,))
    elif search_option == "SEARCH by number":
        query = "SELECT * FROM trainList WHERE number = %s"
        cursor.execute(query, (number,))  # Pass number as a tuple

    train_data = cursor.fetchall()
    cursor.close()

    if not train_data:
        return jsonify({'message': 'No results found'})  # Handle empty result set

    # Convert timedelta objects to strings
    for train in train_data:
        train['arrival'] = str(train['arrival'])
        train['departure'] = str(train['departure'])

    return jsonify(train_data)


CORS(app)  
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
