from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

def login_user(cedula, password, db):
    print('Login Usuario')

    usuarios = db['usuarios']
    resultado = usuarios.find_one({'cedula': cedula})

    if resultado is not None:
        # La cedula existe en la base de datos
        print('La cedula existe en la base de datos')
        if check_password_hash(resultado['password'],password):
            return True
        else:
            return False
    else:
        print('La cedula no existe en la base de datos')
        return False
