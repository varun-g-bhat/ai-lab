from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values

config = dotenv_values(".env")


def connect_Db():
    client = MongoClient(config["MONGODB_CONNECTION_STRING"], server_api=ServerApi('1'))
                          
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    
    return client['mydatabase']


db = connect_Db()