

def check_balance(cedula, account, db):
    print('El usuario {} esta consultando el saldo'.format(cedula))

    cuentas = db['cuentas']
    #mydict = {'id_cuenta': account, 'cedula': cedula, 'nickname': nickname, 'saldo': 25}
    cuenta = cuentas.find_one({"id_cuenta": account})

    saldo = cuenta["saldo"]

    print('El saldo de {} en la cuenta {} es de ${}'.format(cedula,account,saldo))
    return saldo


