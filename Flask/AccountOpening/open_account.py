import random

def gen_account(type='01'):
    print('Creando numero de cuenta')
    #Generamos un randomico de cuenta bancaria
    #Supuestas curusales (24 Provincias)
    ccc = random.randint(1,24)
    ccc = str.format(ccc)

    #Digitos de la cuenta
    nnn = str(random.randint(10**9, 10**10 - 1))

    #Tipo de cuenta 01 en ahorro y 02 en corriente (a futuro)
    ss = type

    account = ccc+nnn+ss
    print('La cuenta {} fue generada con exito'.format(account))

    return account

def open_account(cedula,nickname, type, db):
    print('El usuario {} esta creando una cuenta'.format(cedula))

    cuentas = db['cuentas']

    check = True

    while check:
        #Generar un numero de cuenta
        account = gen_account(type)
        resultado = cuentas.find_one({'id_cuenta': account})

        if resultado is not None:
            print('El número de cuenta {} ya existe en la base de datos.'.format(account))
            check = True
        else:
            print('El número de cuenta {} no existe en la base de datos.'.format(account))
            check = False

    print('El numero de cuenta {} del usuario {} se registro correctamente'.format(account,cedula))

    mydict = {'id_cuenta': account, 'cedula': cedula, 'nickname': nickname, 'saldo': 25}

    x = cuentas.insert_one(mydict)

    print('Creacion exitosa')
    print(x.inserted_id)

    #Retornar 