BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "transaccion" (
	"id_transaccion"	TEXT NOT NULL UNIQUE,
	"fecha"	TEXT NOT NULL,
	"monto"	TEXT NOT NULL,
	PRIMARY KEY("id_transaccion")
);
CREATE TABLE IF NOT EXISTS "cuenta" (
	"id_cuenta"	TEXT NOT NULL UNIQUE,
	"tipo"	TEXT NOT NULL,
	"nombre"	TEXT NOT NULL,
	PRIMARY KEY("id_cuenta")
);
CREATE TABLE IF NOT EXISTS "cliente" (
	"id_cliente"	TEXT NOT NULL UNIQUE,
	"nombre"	INTEGER NOT NULL,
	PRIMARY KEY("id_cliente")
);
CREATE TABLE IF NOT EXISTS "banco" (
	"id_banco"	TEXT NOT NULL UNIQUE,
	"nombre"	TEXT NOT NULL,
	"ipv4"	TEXT NOT NULL,
	PRIMARY KEY("id_banco")
);
CREATE TABLE IF NOT EXISTS "usuario" (
	"id_usuario"	TEXT NOT NULL UNIQUE,
	"nombre"	TEXT NOT NULL,
	"correo"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"salt"	TEXT NOT NULL,
	"about"	TEXT NOT NULL,
	"apellido"	TEXT NOT NULL,
	PRIMARY KEY("id_usuario")
);
INSERT INTO "transaccion" ("id_transaccion","fecha","monto") VALUES ('1','2019.9.13','3459');
INSERT INTO "transaccion" ("id_transaccion","fecha","monto") VALUES ('2','2016.4.23','23');
INSERT INTO "transaccion" ("id_transaccion","fecha","monto") VALUES ('3','2023.3.3','10');
INSERT INTO "transaccion" ("id_transaccion","fecha","monto") VALUES ('4','2011.5.6','6');
INSERT INTO "cuenta" ("id_cuenta","tipo","nombre") VALUES ('1','A','CuentaPersonal');
INSERT INTO "cuenta" ("id_cuenta","tipo","nombre") VALUES ('2','A','CuentaPersonal');
INSERT INTO "cuenta" ("id_cuenta","tipo","nombre") VALUES ('3','A','CuentaPersonal');
INSERT INTO "cliente" ("id_cliente","nombre") VALUES ('1','Mateo Sarzosa');
INSERT INTO "cliente" ("id_cliente","nombre") VALUES ('2','Alejandro Moya');
INSERT INTO "cliente" ("id_cliente","nombre") VALUES ('3','Elisa Herrera');
INSERT INTO "cliente" ("id_cliente","nombre") VALUES ('4','Pablo Sarzosa');
INSERT INTO "banco" ("id_banco","nombre","ipv4") VALUES ('1','Horizon Bank','0.0.0.0');
INSERT INTO "usuario" ("id_usuario","nombre","correo","password","salt","about","apellido") VALUES ('1','Mateo','mateosv@outlook.com','passw0rd','abc123','holi','Sarzosa');
INSERT INTO "usuario" ("id_usuario","nombre","correo","password","salt","about","apellido") VALUES ('2','Alejandro','alejo@moya.com','zzz','abc123','hola','Moya');
INSERT INTO "usuario" ("id_usuario","nombre","correo","password","salt","about","apellido") VALUES ('3','Elisa','elisa@herrera.com','zzz','abc123','hole','Herrera');
INSERT INTO "usuario" ("id_usuario","nombre","correo","password","salt","about","apellido") VALUES ('4','Pablo','pablo@sarzosa.com','yyy','abc123','holo','Sarzosa');
COMMIT;
