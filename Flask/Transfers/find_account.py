

def find_account(destination_account, db):
    print('Consultando existencia de la cuenta {} en el banco'.format(destination_account))

    cuentas = db['cuentas']

    resultado = cuentas.find_one({'id_cuenta': destination_account})
    
    if resultado is not None:
        print('El número de cuenta {} si existe en la base de datos.'.format(destination_account))
        return True
    else:
        print('El número de cuenta {} no existe en la base de datos.'.format(destination_account))
        return False

