import user_check
from pymongo import MongoClient

def insert_user(cedula,password,nombres,apellidos, email, db):

    #Proceso de registro
    if user_check.val_user(cedula,db) is False:
        usuarios = db['usuarios']

        mydict = { "cedula": cedula, "password": password, 'nombres': nombres, 'apellidos':apellidos, "email":email}

        usuarios.insert_one(mydict)