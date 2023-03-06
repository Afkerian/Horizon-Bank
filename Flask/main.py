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
from Email.send_email import send_email
from PDF.gen_pdf import gen_pdf
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
            
            archivo = gen_pdf(cedula, 'creacion_usuario',
                      nombres, apellidos,
                      'None', 100, 'none')
            cuerpo = """Asunto: Registro de usuario exitoso

                        Estimado/a {},

                        Le informamos que su registro ha sido exitoso en nuestro banco. 
                        Ahora podrá disfrutar de todos nuestros servicios financieros en línea.

                        A continuación encontrará la información de su perfil:

                        - Nombre completo: {} {}
                        - Correo electrónico: {}
                        - Número de identificación: {}

                        Le agradecemos por confiar en nosotros y quedamos a su disposición para cualquier consulta o gestión que necesite realizar.

                        Atentamente,
                        El equipo de Horizon Bank
                        """.format(apellidos+' '+nombres,apellidos,nombres,email, cedula)
            
            send_email('Registro de Usuario',email, cuerpo, archivo)
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
        usuario = db.usuarios.find_one({'cedula': cedula})
        cuenta = db.cuentas.find_one({'cedula': cedula})
        archivo = gen_pdf(usuario['cedula'], 'creacion_cuenta',
                      usuario['nombres'], usuario['apellidos'],
                      cuenta['id_cuenta'], 100, 'none')
        cuerpo = """Estimado/a {},

                    Le informamos que su cuenta ha sido creada exitosamente en nuestro banco.

                    A continuación encontrará la información de su cuenta:

                    - Nombre de cuenta: {}
                    - Número de cuenta: {}
                    - Tipo de cuenta: Corriente
                    - Saldo inicial: 25

                    Le agradecemos por confiar en nosotros y quedamos a su disposición para cualquier consulta o gestión que necesite realizar.

                    Atentamente,
                    El equipo de Horizon Bank""".format(usuario['nombres'], nickname, cuenta['id_cuenta'])

           
        send_email('Creacion de Cuenta',usuario['email'], cuerpo, archivo)
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
            cuenta = db.cuentas.find_one({'id_cuenta': account})
            cedula = cuenta['cedula']
            usuario = db.usuarios.find_one({'cedula': cedula})
            print(usuario['nombres'], account, str(monto))
            cuerpo = """
                        Estimado/a {},

                        Le agradecemos por su transferencia por un monto de ${} realizada desde la cuenta XXXXXX{}.

                        Hemos confirmado la recepción de la transferencia y hemos acreditado el monto a su cuenta. 
                        Le sugerimos que revise su estado de cuenta para confirmar la transacción.

                        Si tiene alguna pregunta o inquietud, no dude en ponerse en contacto con nosotros.

                        Gracias por confiar en nuestros servicios.

                        Atentamente,
                        Horizon Bank
                        """.format(usuario['nombres'], str(monto), account[-4:] )
            archivo = gen_pdf(usuario['cedula'], 'transferencia',
                      usuario['nombres'], usuario['apellidos'],
                      cuenta['id_cuenta'], monto, 'none')
            
            send_email('Transferencia',usuario['email'], cuerpo, archivo)
            mydict = {'tipo': 'Transferencia', 'cedula': cedula, 'origen': account, 'destino': destination_account, 'monto': monto}
            db.transacciones.insert_one(mydict)
            return {'flag': True, 'message': 'Transaccion Exitosa'}
        else:
            return {'flag': False, 'message': 'Saldo Insuficiente'}
    else:
        return {'flag': False, 'message': 'Cuenta de Destino no Existe'}

@app.route('/APIEstadoCuenta', methods=['GET'])
def estado_cuenta():
    db = mongo.db
    
    # Obtener todos las transacciones en la colección de transacciones de la base de datos
    transacciones = db.transacciones.find({'cedula': request.args.get('cedula')})

    resultado = []

    # Iterar a través de las cuentas y agregarlos a la lista de resultados
    for transaccion in transacciones:
        resultado.append({
            'tipo': transaccion['tipo'],
            'cedula': transaccion['cedula'],
            'origen': transaccion['origen'],
            'destino': transaccion['destino'],
            'monto': transaccion['monto'],
        })

    usuario = db.usuarios.find_one({'cedula': request.args.get('cedula')})
    cuenta = db.cuentas.find_one({'cedula': request.args.get('cedula')})
    archivo = gen_pdf(usuario['cedula'], 'estado_de_cuenta',
                      usuario['nombres'], usuario['apellidos'],
                      cuenta['id_cuenta'], 100, resultado)
    cuerpo = "Estimado/a "+ usuario['nombres']+',\n\n'+'Le enviamos adjunto su estado de cuenta.\n\n'+ 'Por favor, revise la información detallada en el estado de cuenta y verifique que todo esté correcto. Si tiene alguna pregunta o inquietud, no dude en ponerse en contacto con nosotros.\n\n'+'Recuerde que puede realizar pagos en línea a través de nuestra página web, o en cualquiera de nuestras sucursales.\n\n'+'Atentamente,\n'+'Horizon Bank.'

    send_email('Estado de Cuenta', usuario['email'], cuerpo, archivo)
    # Devolver la lista de resultados como JSON
    return {'message': 'Estado de Cuenta Generado Exitosamente!'}


if __name__ == '__main__':
    app.run(host='127.0.0.1',debug=True, port=5000)
    print('Base de Datos')