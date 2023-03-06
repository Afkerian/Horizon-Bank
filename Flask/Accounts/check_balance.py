

def check_balance(account, db):
    print('Consultando el saldo de la cuenta {}'.format(account))

    cuentas = db['cuentas']
    #mydict = {'id_cuenta': account, 'cedula': cedula, 'nickname': nickname, 'saldo': 25}
    cuenta = cuentas.find_one({"id_cuenta": account})

    saldo = cuenta["saldo"]

    print('El saldo de la cuenta {} es de ${}'.format(account,saldo))
    return saldo


