from flask import Flask, request
from flask import render_template
from DataBaseConnection import mongo_connect
import json
from werkzeug.security import generate_password_hash, check_password_hash
from UserRegister.idcard import validar_cedula, user_exists
from UserRegister.registrar_usuario import save_usuario
from flask_pymongo import PyMongo
from AccountOpening.open_account import open_account
from bson import json_util
from flask_cors import CORS
from Login.login_user import login_user

PATH_FRONT = '../Angular/horizon-fe/src/'
app = Flask(__name__,template_folder=PATH_FRONT)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
app.config['MONGO_URI'] = 'mongodb+srv://isaacmateosv:mongodv@testmongo.1uoiaiv.mongodb.net/horizonbankdb'

mongo = PyMongo(app)

@app.route('/APIRegistrarUsuario', methods=['POST'])
def registrar_usuario():
    db = mongo.db

    print(request.json)
    nombres = request.json['nombres']
    apellidos = request.json['apellidos']
    cedula = request.json['cedula']
    email = request.json['email']
    password = request.json['password']

    if validar_cedula(cedula) is True:
        #Si a cedula es correcta
        if user_exists(cedula,db) is True:
            return {'message':'Ya existe en la Base de Datos',
                    'flag': False}
        else:
            #Registramos al Usuario
            password = generate_password_hash(password)
            save_usuario(nombres, apellidos, cedula, email, password, db)
            return {'message':'Registrado Exitosamente',
                    'flag': True}
    else:
        #Si la cedula no es correcta
        return {'message':'Cédula Invalida',
                'flag': False}

@app.route('/APIRegistrarCuenta', methods=['POST'])
def registrar_cuenta():
    db = mongo.db

    print(request.json)
    nickname = request.json['nickname']
    cedula = request.json['cedula']
    
    if open_account(cedula, nickname, db) is True:
        return {'message': 'Creada Exitosamete',
                'flag': True}
    else:
        return {'message': 'Error al crear la cuenta',
                'flag': False}
    
@app.route('/APIEditarUsuario', methods=['POST'])
def editar_usuario():
    db = mongo.db

    print(request.json)
    nombres = request.json['nombres']
    apellidos = request.json['apellidos']
    cedula = request.json['cedula']
    email = request.json['email']
    password = request.json['password']

@app.route('/APIObtenerUsuarios', methods=['GET'])
def obtener_usuarios():
    db = mongo.db

    # Obtener todos los usuarios en la colección de usuarios de la base de datos
    usuarios = db.usuarios.find()

    #response = json_util.dumps(usuarios)
    #return response

    # Crear una lista vacía para almacenar los resultados
    resultado = []

    # Iterar a través de los usuarios y agregarlos a la lista de resultados
    for usuario in usuarios:
        resultado.append({
            'nombres': usuario['nombres'],
            'apellidos': usuario['apellidos'],
            'cedula': usuario['cedula'],
            'email': usuario['email']
        })

    # Devolver la lista de resultados como JSON
    return {'usuarios': resultado}

@app.route('/APILogin', methods=['POST'])
def login():
    db = mongo.db
    
    cedula = request.json['cedula']
    password = request.json['password']
    
    if login_user(cedula,password, db):
        usuarios = db['usuarios']
        resultado = usuarios.find_one({'cedula': cedula})
        
        return {'flag': True,
                'nombres': resultado['nombres'],
                'apellidos':resultado['apellidos'],
                'cedula': cedula,
                'email': resultado['email'] 
                }
    else:
        return {'flag': False, 'message': 'Usuario o contraseña incorrectos'}




if __name__ == '__main__':
    app.run(host='127.0.0.1',debug=True, port=5000)
    print('Base de Datos')