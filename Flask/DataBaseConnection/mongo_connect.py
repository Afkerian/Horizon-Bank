import pymongo

# establecer conexión con la base de datos
client = pymongo.MongoClient("mongodb://localhost:27017/")

# seleccionar la base de datos
db = client["horizonbankdb"]

# realizar alguna operación en la base de datos, por ejemplo, imprimir la cantidad de documentos en una colección llamada "clientes"
clientes = db["clientes"]
print(clientes.count_documents({}))
