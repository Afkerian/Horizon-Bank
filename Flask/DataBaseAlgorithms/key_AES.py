from cryptography.fernet import Fernet

def gen_key():
    # generar una nueva clave de cifrado
    key = Fernet.generate_key()
    
    return key

def save_key(key):
    # escribir la clave en un archivo de texto
    with open('clave.txt', 'wb') as f:
        f.write(key)

def read_key(key):
    # leer la clave del archivo de texto
    with open('clave.txt', 'rb') as f:
        key = f.read()

    # crear una instancia del objeto Fernet utilizando la clave leída del archivo de texto
    cipher_suite = Fernet(key)

    return cipher_suite
