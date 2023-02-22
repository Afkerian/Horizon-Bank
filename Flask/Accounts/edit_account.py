from pymongo import MongoClient

def edit_account(id_cuenta, nickname, db, cedula):
    print('El usuario {} esta editando su nickname de cuenta'.format(cedula))

    cuentas = db['cuentas']

    myquery = { "id_cuenta": id_cuenta }
    newvalues = { "$set": { "nickname": nickname } }

    cuentas.update_one(myquery, newvalues)

    print('Actualizacion Exitosa')

    #Return algo