from pymongo import MongoClient
import certifi

MONGO_URI = 'mongodb+srv://isaacmateosv:mongodv@testmongo.1uoiaiv.mongodb.net/?retryWrites=true&w=majority'

ca = certifi.where()

def dbConnection():
    try:
        client=MongoClient(MONGO_URI,tlsCAFile=ca)
        db = client["dbb_usuarios_app"]
    except ConnectionError:
        print('Error de conexion con la BDD')
    return db