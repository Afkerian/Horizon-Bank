CREATE DATABASE HorizonBank_clientes_db;

use HorizonBank_clientes_db;

Create table clientes(
    id int(11) not null AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(20),
    apellido varchar(20),
    tipoCuenta varchar(20),
    monto DECIMAL(12, 2)
);