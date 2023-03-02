from flask import Flask, request
from flask import render_template
from DataBaseConnection import mongo_connect
import json
from werkzeug.security import generate_password_hash, check_password_hash
from UserRegister.idcard import validar_cedula, user_exists
from UserRegister.registrar_usuario import save_usuario
from flask_pymongo import PyMongo
from AccountOpening.open_account import open_account

from flask_cors import CORS


PATH_FRONT = '../Angular/horizon-fe/src/'
app = Flask(__name__,template_folder=PATH_FRONT)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
app.config['MONGO_URI'] = 'mongodb+srv://isaacmateosv:mongodv@testmongo.1uoiaiv.mongodb.net/horizonbankdb'

mongo = PyMongo(app)

@app.route('/APIRegistrarUsuario', methods=['POST'])
def registrar_usuario():
    db = mongo.db

    print(request.json)
    nombres1 = request.json['nombres']
    print(request.json['password'])
    apellidos1 = request.json['apellidos']
    cedula1 = request.json['cedula']
    email1 = request.json['email']
    password1 = request.json['password']
    
    if validar_cedula(cedula1) is True:
        #Si a cedula es correcta
        if user_exists(cedula1,db) is True:
            return {'message':'Ya existe en la Base de Datos',
                    'flag': False}
        else:
            #Registramos al Usuario
            password1 = generate_password_hash(password1)
            save_usuario(nombres1, apellidos1, cedula1, email1, password1, db)
            return {'message':'Registrado Exitosamente',
                    'flag': True}
    else:
        #Si la cedula no es correcta
        return {'message':'Cedula Invalida',
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
    
if __name__ == '__main__':
    app.run(host='127.0.0.1',debug=True, port=5000)
    print('Base de Datos')