from pymongo import MongoClient


def validar_cedula(cedula):
    """
    Verifica si un número de cédula ecuatoriana es válido.
    Retorna True si es válido, False en caso contrario.
    """

    '''
    un número entre 1 y 2 (para cédulas de ciudadanos ecuatorianos)
    o un 9 (para cédulas de extranjeros residentes) y operacion de digito
    de verificacion.
    '''
    if len(cedula) != 10:
        return False

    primer_digito = int(cedula[0])
    if primer_digito not in (1, 2, 9):
        return False

    total = 0
    digito_verificador = int(cedula[-1])
    for i, digito in enumerate(cedula[:-1]):
        digito = int(digito)
        if i % 2 == 0:
            digito *= 2
            if digito > 9:
                digito -= 9
        total += digito

    total %= 10
    if total != 0:
        total = 10 - total

    return total == digito_verificador

def user_exists(cedula, db):
    usuarios = db['usuarios']
    resultado = usuarios.find_one({'cedula': cedula})
    
    if resultado is not None:
        print('El número de cédula {} ya existe en la base de datos.'.format(cedula))
        return True
    else:
        print('El número de cédula {} no existe en la base de datos.'.format(cedula))
        return False


