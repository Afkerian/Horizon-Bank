import pymongo

# establecer conexión con la base de datos
client = pymongo.MongoClient("mongodb+srv://isaacmateosv:mongodv@testmongo.1uoiaiv.mongodb.net/horizonbankdb")

# seleccionar la base de datos
db = client["horizonbankdb"]

# realizar alguna operación en la base de datos, por ejemplo, imprimir la cantidad de documentos en una colección llamada "clientes"
clientes = db["users"]
print(clientes.count_documents({}))
x = clientes.find_one()
#print(x['nombre'])

for x in clientes.find():
    print(x['nombre'])
