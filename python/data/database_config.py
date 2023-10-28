import mysql.connector

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "shrudex",
    "database": "routeRover"
}

db = mysql.connector.connect(**db_config)
