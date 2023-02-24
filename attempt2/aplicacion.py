from flask import Flask, render_template, request, jsonify, redirect, url_for
import database
from usuario import Usuario 

db = database.dbConnection()

vistaPrincipal = Flask (__name__)

#rutas de la app
@vistaPrincipal.route('/')

def home():
    usuarios = db['usuarios']
    usuariosReceived = usuarios.find()
    return render_template('inicio.html', usuarios = usuariosReceived)

#--------------------TODO ESTO CORRESPONDE A INDEX.HTML----------------------------
# method POST
@vistaPrincipal.route('/usuarios',methods=['POST'])
def addUsuario():
    usuarios = db['usuarios']
    name = request.form['name']
    price = request.form['price']
    quantity = request.form['quantity']

    if name and price and quantity:
        usuario = Usuario(name,price,quantity)
        usuarios.insert_one(usuario.toDBCollection())
        response = jsonify({
            'name': name,
            'price': price,
            'quantity': quantity
        })
        return redirect(url_for('home'))
    else:
        return notFound()

# method delete
@vistaPrincipal.route('/delete/<string:usuario_name>')
def delete(usuario_name):
    usuarios = db['usuarios']
    usuarios.delete_one({'name': usuario_name})
    return redirect(url_for('home'))

# method put
@vistaPrincipal.route('/edit/<string:usuario_name>', methods=['POST'])
def edit(usuario_name):
    usuarios = db['usuarios']
    name = request.form['name']
    price = request.form['price']
    quantity = request.form['quantity']

    if name and price and quantity:
        usuarios.update_one({'name': usuario_name},{'$set' : {'name':name,'price':price,'quantity':quantity}})
        response = jsonify({'message':'Usuario ' + usuario_name + 'actualizado correctamente :)'})
        return redirect(url_for('home'))
    else:
        return notFound()

#--------------------HASTA ACÁ CORRESPONDE A INDEX.HTML----------------------------

@vistaPrincipal.errorhandler(404)
def notFound(error=None):
    message = {
        'message': 'No encontrado :/' + request.url,
        'status': '404 Not Found'
    }
    response = jsonify(message)
    response.status_code=404
    return response

### PAGINA INICIO DE SESION
# method GET para llamar con el enlace
@vistaPrincipal.route('/sesion',methods=['GET'])
def sesion():
    # usuarios = db['usuarios']
    # usuariosReceived = usuarios.find()
    return render_template('sesion.html')

### PAGINA INICIO DE SESION
@vistaPrincipal.route('/registro',methods=['GET'])
def registro():
    # usuarios = db['usuarios']
    # usuariosReceived = usuarios.find()
    return render_template('registro.html')

if __name__ == '__main__':
    vistaPrincipal.run(debug=True, port=4000)