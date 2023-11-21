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

@app.route('/get_user', methods=['POST'])
def get_user():
    data = request.get_json()
    email = data['email']

    cursor = db.cursor()
    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()
    cursor.close()

    if result is None:
        return jsonify({'name': 'User not found'})

    user_name = result[0]
    return jsonify(result)


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

@app.route('/store_passenger_details', methods=['POST'])
def store_passenger_details():
    data = request.get_json()
    email = data['email']
    train_number = data['trainNumber']
    book_id = data['bookID']
    passengers = json.loads(data['passengers'])
    #an array of passenger details

    cursor = db.cursor()
    for passenger in passengers:
        pname = passenger['name']
        page = passenger['age']
        pgender = passenger['gender']
        pclass = passenger['coach']
        

        insert_query = "INSERT INTO passengerDetails (email, trainNumber,bookID, pname, page, pgender, pclass) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (email, train_number, book_id, pname, page, pgender, pclass))
    db.commit()
    cursor.close()

    return jsonify({'message': 'Passenger details stored successfully'})

@app.route('/store_booking_details', methods=['POST'])
def store_booking_details():
    data = request.get_json()
    email = data['email']
    book_id = data['bookID']
    train_number = data['trainNumber']
    seats_booked = data['seatsBooked']
    coach = data['coach']

    # Calculate the fare by querying the trainList table
    cursor = db.cursor(dictionary=True)
    query = f"SELECT {coach} FROM trainList WHERE number = %s"  # Use f-string
    cursor.execute(query, (train_number,))
    result = cursor.fetchone()
    cursor.close()

    if result is None:
        return jsonify({'error': 'Train not found'}), 404

    price = result[coach]
    fare = price * seats_booked

    # Insert the booking details into the bookingFare table
    cursor = db.cursor()
    insert_query = "INSERT INTO bookingFare (email, bookID, trainNumber, seatsBooked, coach, fare) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(insert_query, (email, book_id, train_number, seats_booked, coach, fare))
    db.commit()
    cursor.close()

    return jsonify({'message': 'Booking details stored successfully'})

@app.route('/user_booking_details', methods=['POST'])
def user_booking_details():
    data = request.get_json()
    email = data['email']
    bookID = data['bookID']
    journeyDate = data['journeyDate']

    cursor = db.cursor()
    insert_query = "INSERT INTO userBooking (email, bookID, journeyDate) VALUES (%s, %s, %s)"
    cursor.execute(insert_query, (email, bookID, journeyDate))
    db.commit()
    cursor.close()

    return jsonify({'message': 'User booking details stored successfully'})

@app.route('/fetch_passenger_details', methods=['GET'])
def fetch_passenger_details():
    bookID = request.args.get('bookID')
    cursor = db.cursor(dictionary=True)
    query = "SELECT pname, page, pgender, pclass FROM passengerDetails WHERE bookID = %s"
    cursor.execute(query, (bookID,))
    passenger_details = cursor.fetchall()
    cursor.close()
    return jsonify(passenger_details)

@app.route('/fetch_booking_fare', methods=['GET'])
def fetch_booking_fare():
    bookID = request.args.get('bookID')
    cursor = db.cursor(dictionary=True)
    query = "SELECT seatsBooked, fare FROM bookingFare WHERE bookID = %s"
    cursor.execute(query, (bookID,))
    booking_fare = cursor.fetchone()
    cursor.close()
    return jsonify(booking_fare)

@app.route('/fetch_user_booking', methods=['GET'])
def fetch_user_booking():
    bookID = request.args.get('bookID')
    cursor = db.cursor(dictionary=True)
    query = "SELECT bookID, journeyDate FROM userBooking WHERE bookID = %s"
    cursor.execute(query, (bookID,))
    user_booking = cursor.fetchone()
    cursor.close()
    return jsonify(user_booking)

@app.route('/stations', methods=['GET'])
def get_all_stations():
    cursor = db.cursor(dictionary=True)
    query = "SELECT stationCode, stationName, location, otherDetails FROM stations"
    cursor.execute(query)
    stations = cursor.fetchall()
    cursor.close()
    return jsonify(stations)

@app.route('/stations/<station_code>', methods=['GET'])
def get_station_details(station_code):
    cursor = db.cursor(dictionary=True)
    query = "SELECT stationCode, stationName, location, otherDetails FROM stations WHERE stationCode = %s"
    cursor.execute(query, (station_code,))
    station = cursor.fetchone()
    cursor.close()

    if station is not None:
        return jsonify(station)

    return jsonify({'error': 'Station not found'}), 404

@app.route('/get-user-booking', methods=['GET'])
def get_user_booking():
    email = request.args.get('email')
    #print(email)
    if not email:
        return jsonify({"error": "Email is required"})

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT bookID, journeyDate FROM userBooking WHERE email = %s", (email,))
    booking_data = cursor.fetchall()
    
    cursor.close()
    #print(booking_data)
    if booking_data:
        for booking in booking_data:
            bookID  = booking['bookID']
            cursor = db.cursor(dictionary=True)
            cursor.execute("SELECT trainNumber, seatsBooked, coach, fare FROM bookingFARE where bookID = %s", (bookID,))
            temp_data = cursor.fetchone()
            cursor.close()
            
            for key, value in temp_data.items():
                booking[key] = value
            
            cursor = db.cursor(dictionary=True)
            cursor.execute("SELECT pName, pAge, pGender, pClass from passengerDetails where bookID = %s", (bookID, ))
            temp_data = cursor.fetchall()
            cursor.close()
            #print(temp_data)
            booking['passengerDetails'] = temp_data
            
            trainNum = booking['trainNumber']
            cursor = db.cursor (dictionary=True)
            cursor.execute("SELECT name, origin, destination, arrival, departure from trainList where number = %s", (trainNum,))
            temp_data = cursor.fetchone()
            #for train in temp_data:
            temp_data['arrival'] = str(temp_data['arrival'])
            temp_data['departure'] = str(temp_data['departure'])
            cursor.close()
            booking['trainData'] = temp_data
            
        return jsonify(booking_data)
    else:
        return jsonify({"error": "User not found"})

@app.route('/dropdown_options', methods=['GET'])
def get_dropdown_options():
    cur = db.cursor()  # Use db instead of mysql.connection
    cur.execute("SELECT typeOfQuery FROM contact")
    dropdown_options = cur.fetchall()
    cur.close()
    return jsonify({'options': dropdown_options})

@app.route('/get_helpline/<string:selected_option>', methods=['GET'])
def get_helpline(selected_option):
    try:
        cur = db.cursor(dictionary=True)
        cur.execute("SELECT HelpLineNumber FROM contact WHERE typeOfQuery = %s", (selected_option,))
        helpline_data = cur.fetchone()
        cur.close()

        if helpline_data:
            return jsonify({'helpline': helpline_data['HelpLineNumber']})
        else:
            return jsonify({'error': 'Helpline not found for the selected option'})

    except Exception as e:
        return jsonify({'error': str(e)})



#admin login section
@app.route('/admin_login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    cursor = db.cursor()
    query = "SELECT username, password FROM admin WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()

    if result is None:
        cursor.close()
        return jsonify({'error': 'User not found'}), 401

    username, stored_password = result
    cursor.close()

    if password == stored_password:
        # successful login
        return jsonify({'message': 'Login successful', 'user_id': username})

    return jsonify({'error': 'Incorrect password'}), 401



@app.route('/get_admin', methods=['POST'])
def get_admin():
    data = request.get_json()
    email = data['email']

    cursor = db.cursor(dictionary=True)
    query = "SELECT * FROM admin WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()
    cursor.close()

    if result is None:
        return jsonify({'name': 'User not found'})
    
    admin_data = {key: result[key] for key in result if key != 'password'}

    return jsonify(admin_data)




CORS(app)  
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
