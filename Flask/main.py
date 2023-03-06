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
from Transfers.transfer import local_transfer
from Transfers.find_account import find_account

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
    
    usuarios = db['usuarios']
    myquery = { 'cedula': cedula }
    newvalues = { '$set': { 'nombres': nombres, 'apellidos': apellidos, 'email': email} }
    
    usuarios.update_one(myquery,newvalues)
    
    return {'flag': True, 'message': 'Actualizacion Exitosa'}

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

@app.route('/APIObtenerCuentas', methods=['GET'])
def obtener_cuentas():
    db = mongo.db

    # Obtener todos las cuentas en la colección de cuentas de la base de datos
    cuentas = db.cuentas.find()


    # Crear una lista vacía para almacenar los resultados
    resultado = []

    # Iterar a través de las cuentas y agregarlos a la lista de resultados
    for cuenta in cuentas:
        resultado.append({
            'id_cuenta': cuenta['id_cuenta'],
            'nickname': cuenta['nickname'],
            'cedula': cuenta['cedula']
        })

    # Devolver la lista de resultados como JSON
    return {'cuentas': resultado}

@app.route('/APIObtenerCuentasCliente', methods=['GET'])
def obtener_cuentas_cliente():
    db = mongo.db
    
    # Obtener todos las cuentas en la colección de cuentas de la base de datos
    cuentas = db.cuentas.find({'cedula': request.args.get('cedula')})

    resultado = []

    # Iterar a través de las cuentas y agregarlos a la lista de resultados
    for cuenta in cuentas:
        resultado.append({
            'id_cuenta': cuenta['id_cuenta'],
            'nickname': cuenta['nickname'],
            'cedula': cuenta['cedula'],
            'saldo': cuenta['saldo']
        })

    # Devolver la lista de resultados como JSON
    return {'cuentas': resultado}

@app.route('/APITransferenciaLocal', methods=['POST'])
def transferencia_local():
    db = mongo.db
    
    account = request.json['account']
    destination_account = request.json['destination_account']
    monto = request.json['monto']
    
    if find_account(destination_account,db):
        if local_transfer(account, destination_account, monto, db):
            return {'flag': True, 'message': 'Transaccion Exitosa'}
        else:
            return {'flag': False, 'message': 'Saldo Insuficiente'}
    else:
        return {'flag': False, 'message': 'Cuenta de Destino no Existe'}


if __name__ == '__main__':
    app.run(host='127.0.0.1',debug=True, port=5000)
    print('Base de Datos')