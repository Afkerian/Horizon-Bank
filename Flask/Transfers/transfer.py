from Accounts import check_balance

def local_transfer(account, destination_account, monto, db):
    print('Transferencia de {} de la cuenta {} hacia {}'.format(monto,account,destination_account))

    monto = float(monto)
    #Verificar balance
    saldo = float(check_balance.check_balance(account,db))

    if saldo > monto:
        print('Saldo suficiente')
        cuentas = db['cuentas']
        
        #Nuevo saldo origen
        saldo = saldo - monto

        myquery = { "id_cuenta": account }
        newvalues = { "$set": { "saldo": saldo } }

        cuentas.update_one(myquery, newvalues)

        #Nuevo saldo destino
        saldo = float(check_balance.check_balance(destination_account,db))

        saldo = saldo + monto

        myquery = { "id_cuenta": destination_account }
        newvalues = { "$set": { "saldo": saldo } }

        cuentas.update_one(myquery, newvalues)

        return True
    else:
        print('Saldo insuficiente')
        return False
