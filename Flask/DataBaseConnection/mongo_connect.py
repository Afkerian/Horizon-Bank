import pymongo

def mongo_connect():
    # establecer conexión con la base de datos
    client = pymongo.MongoClient("mongodb+srv://isaacmateosv:mongodv@testmongo.1uoiaiv.mongodb.net/test")

    # seleccionar la base de datos
    db = client["horizonbankdb"]

    return db
    # realizar alguna operación en la base de datos, por ejemplo, imprimir la cantidad de documentos en una colección llamada "clientes"
    clientes = db["clientes"]
    print(clientes.count_documents({}))
