from cryptography.fernet import Fernet
import pymongo

class EncryptedCollection:
    def __init__(self, collection, key):
        self.collection = collection
        self.key = key
        self.cipher_suite = Fernet(key)

    def find(self, filter=None, projection=None, skip=0, limit=0, no_cursor_timeout=False, cursor_type=pymongo.cursor.CursorType.NON_TAILABLE):
        # consultar los datos de la colección
        results = self.collection.find(filter, projection, skip, limit, no_cursor_timeout, cursor_type)

        # descifrar los datos obtenidos de la consulta
        decrypted_results = [self.cipher_suite.decrypt(bytes(result)).decode() for result in results]

        # devolver los datos descifrados
        return decrypted_results

    def insert_one(self, document):
        # cifrar el documento antes de insertarlo en la colección
        encrypted_document = self.cipher_suite.encrypt(document.encode())

        # insertar el documento cifrado en la colección
        result = self.collection.insert_one(encrypted_document)

        # devolver el resultado de la operación de inserción
        return result

    def insert_many(self, documents):
        # cifrar los documentos antes de insertarlos en la colección
        encrypted_documents = [self.cipher_suite.encrypt(document.encode()) for document in documents]

        # insertar los documentos cifrados en la colección
        result = self.collection.insert_many(encrypted_documents)

        # devolver el resultado de la operación de inserción
        return result

    # implementar otros métodos según sea necesario
