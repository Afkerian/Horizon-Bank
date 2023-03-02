-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public."Banco"
(
    id_banco bigint NOT NULL,
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Banco_pkey" PRIMARY KEY (id_banco)
);

CREATE TABLE IF NOT EXISTS public."Cliente"
(
    id_cliente bigint NOT NULL,
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Cliente_pkey" PRIMARY KEY (id_cliente)
);

CREATE TABLE IF NOT EXISTS public."Cuenta"
(
    id_cuenta bigint NOT NULL,
    tipo character varying COLLATE pg_catalog."default" NOT NULL,
    nombre character varying COLLATE pg_catalog."default",
    CONSTRAINT "Cuenta_pkey" PRIMARY KEY (id_cuenta)
);

CREATE TABLE IF NOT EXISTS public."Transaccion"
(
    id_transaccion bigint NOT NULL,
    fecha date NOT NULL,
    monto money NOT NULL,
    CONSTRAINT "Transaccion_pkey" PRIMARY KEY (id_transaccion)
);

CREATE TABLE IF NOT EXISTS public."Usuario"
(
    id_usuario bigint NOT NULL,
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    correo character varying COLLATE pg_catalog."default" NOT NULL,
    contrasena character varying COLLATE pg_catalog."default" NOT NULL,
    salt character varying COLLATE pg_catalog."default" NOT NULL,
    avatar text COLLATE pg_catalog."default",
    CONSTRAINT "Usuario_pkey" PRIMARY KEY (id_usuario)
);
END;