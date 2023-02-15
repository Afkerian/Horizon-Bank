import pymongo
from cryptography.fernet import Fernet

# clave de cifrado (debes guardarla en un lugar seguro)
key = Fernet.generate_key()

# crear una instancia del objeto Fernet utilizando la clave de cifrado
cipher_suite = Fernet(key)

# establecer conexión con la base de datos
client = pymongo.MongoClient("mongodb://localhost:27017/")

# seleccionar la base de datos
db = client["horizonbankdb"]

# iterar sobre cada colección en la base de datos y cifrar todos los documentos
for coll_name in db.list_collection_names():
    collection = db[coll_name]
    for doc in collection.find():
        # cifrar los datos del documento
        doc_encrypted = cipher_suite.encrypt(str(doc).encode())
        # actualizar el documento cifrado en la base de datos
        collection.replace_one({'_id': doc['_id']}, {'_id': doc['_id'], 'data': doc_encrypted})

# iterar sobre cada colección en la base de datos y descifrar todos los documentos
for coll_name in db.list_collection_names():
    collection = db[coll_name]
    for doc in collection.find():
        # descifrar los datos del documento
        doc_decrypted = cipher_suite.decrypt(doc['data']).decode()
        # actualizar el documento descifrado en la base de datos
        collection.replace_one({'_id': doc['_id']}, {'_id': doc['_id'], 'data': doc_decrypted})
