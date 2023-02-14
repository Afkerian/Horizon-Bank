from UserRegister import idcard

def val_user(cedula, db):
    print('Validacion de existencia del usuario en el sistema')

    #Verifica si la cedula ingresada es valida.
    if idcard.validar_cedula(cedula) is True:
        print('El ingreso de la cedula es correcto')
        # Retorna verdadero si la cedula ya existe y falso si no existe.
        return idcard.user_exists(cedula,db)
    else:
        print('El ingreso de la cedula no es correcto')
        return 'El ingreso de la cedula no es correcto'


