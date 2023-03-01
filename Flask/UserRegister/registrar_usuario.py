from pymongo import MongoClient

def save_usuario(nombres, apellidos, cedula, email, password, db):
    print('Registrando Usuario')

    usuarios = db['usuarios']
    mydict = {'nombres': nombres, 'apellidos': apellidos, 'cedula': cedula, 'email': email, 'password': password}

    x = usuarios.insert_one(mydict)
