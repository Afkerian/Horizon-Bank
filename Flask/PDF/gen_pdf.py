from fpdf import FPDF
import datetime



def gen_pdf(cedula, tipo, nombres, apellidos, cuenta, monto, transacciones):
    
    pdf = FPDF()
    # Agregar una página
    pdf.add_page()
    # Establecer el tamaño de fuente
    pdf.set_font("Arial", size=12)

    fecha = datetime.datetime.now()
    print(fecha)


    if tipo == 'transferencia':
        print('PDF - Transferencia')
        # Agregar una imagen Top
        pdf.image("Flask/Email/logo-horizon-bank.jpg", x=0, y=0, w=210)
        # Escribir texto en el archivo PDF
        pdf.cell(pdf.w, 100, 'Fecha: '+fecha.strftime("%A")+', '+fecha.strftime("%d ")+
                    fecha.strftime('%B of')+fecha.strftime(" %Y")+
                    fecha.strftime(" %H:")+fecha.strftime("%M"), align="C")
        pdf.ln(70)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Transferencia", align="C")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, apellidos+' '+nombres, align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, 'La transferencia se realizó correctamente.', align="L")
        pdf.ln(20)
        # Crear la primera fila de la tabla
        pdf.cell(180, 10, "Detalle", border=1, align="C")
        pdf.ln()  # Agregar un salto de línea
        # Crear seis filas con dos columnas
        pdf.cell(90, 10, "Cuenta acreditada: ", border=1, align="C")
        pdf.cell(90, 10, 'XXXXXX'+cuenta[-4:], border=1, align="C")
        pdf.ln()
        pdf.cell(90, 10, "Fecha: ", border=1, align="C")
        pdf.cell(90, 10, fecha.strftime("%x"), border=1, align="C")
        pdf.ln()
        pdf.cell(90, 10, "Nombre del ordenante: ", border=1, align="C")
        pdf.cell(90, 10, apellidos+' '+nombres, border=1, align="C")
        pdf.ln()
        pdf.cell(90, 10, "Monto: ", border=1, align="C")
        pdf.cell(90, 10, 'USD '+str(monto), border=1, align="C")
        pdf.ln()
        pdf.cell(90, 10, "Número de documento: ", border=1, align="C")
        pdf.cell(90, 10, '21432652', border=1, align="C")
        pdf.ln()
        pdf.ln(10)  # Agregar un salto de línea
        # Escribir texto en el archivo PDF
        pdf.cell(pdf.w, 10, "Si no has solicitado este servicio, repórtalo a nuestra Banca Telefónica al (02)2999 999.", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Gracias por utilizar nuestros servicios.", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Atentamente,", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Horizon Bank", align="L")

        # Agregar una imagen Top
        pdf.image("Flask/Email/footer-horizon-bank.jpg", x=0, y=250, w=210)

        # Guardar el archivo PDF
        pdf.output(tipo+cedula+".pdf")
        return tipo+cedula+".pdf"

    elif tipo == 'estado_de_cuenta':
        print('PDF - Estado de Cuenta')
        # Agregar una imagen Top
        pdf.image("Flask/Email/logo-horizon-bank.jpg", x=0, y=0, w=210)
        # Escribir texto en el archivo PDF
        pdf.cell(pdf.w, 100, 'Fecha: '+fecha.strftime("%A")+', '+fecha.strftime("%d ")+
                    fecha.strftime('%B of')+fecha.strftime(" %Y")+
                    fecha.strftime(" %H:")+fecha.strftime("%M"), align="C")
        pdf.ln(70)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Estado de Cuenta", align="C")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, apellidos+' '+nombres, align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, 'Creacion de Cuenta Exitosa!.', align="L")
        pdf.ln(20)
        pdf.cell(40, 10, "Tipo", border=1, align="C")
        pdf.cell(40, 10, 'Cedula', border=1, align="C")
        pdf.cell(40, 10, 'Cuenta Origen', border=1, align="C")
        pdf.cell(40, 10, 'Cuenta Destino', border=1, align="C")
        pdf.cell(25, 10, 'Monto', border=1, align="C")
        pdf.ln()
        
        # Iterar a través de las cuentas y agregarlos a la lista de resultados
        for transaccion in transacciones:
            pdf.cell(40, 10, transaccion['tipo'], border=1, align="C")
            pdf.cell(40, 10, str(transaccion['cedula']), border=1, align="C")
            pdf.cell(40, 10, str(transaccion['origen']), border=1, align="C")
            pdf.cell(40, 10, str(transaccion['destino']), border=1, align="C")
            pdf.cell(25, 10, str(transaccion['monto']), border=1, align="C")
            pdf.ln()
        
        
        pdf.ln(10)  # Agregar un salto de línea
        # Escribir texto en el archivo PDF
        pdf.cell(pdf.w, 10, "Si no has solicitado este servicio, repórtalo a nuestra Banca Telefónica al (02)2999 999.", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Gracias por utilizar nuestros servicios.", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Atentamente,", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Horizon Bank", align="L")

        # Agregar una imagen Top
        pdf.image("Flask/Email/footer-horizon-bank.jpg", x=0, y=250, w=210)

        # Guardar el archivo PDF
        pdf.output(tipo+cedula+".pdf")
        return tipo+cedula+".pdf"
        
    elif tipo == 'creacion_cuenta':
        print('PDF - Creacion de Cuenta')
        # Agregar una imagen Top
        pdf.image("Flask/Email/logo-horizon-bank.jpg", x=0, y=0, w=210)
        # Escribir texto en el archivo PDF
        pdf.cell(pdf.w, 100, 'Fecha: '+fecha.strftime("%A")+', '+fecha.strftime("%d ")+
                    fecha.strftime('%B of')+fecha.strftime(" %Y")+
                    fecha.strftime(" %H:")+fecha.strftime("%M"), align="C")
        pdf.ln(70)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Notificacion", align="C")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, apellidos+' '+nombres, align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, 'Creacion de Cuenta Exitosa!.', align="L")
        pdf.ln(20)
        pdf.cell(90, 10, "Cuenta: ", border=1, align="C")
        pdf.cell(90, 10, cuenta, border=1, align="C")
        pdf.ln()
        pdf.ln(10)  # Agregar un salto de línea
        # Escribir texto en el archivo PDF
        pdf.cell(pdf.w, 10, "Si no has solicitado este servicio, repórtalo a nuestra Banca Telefónica al (02)2999 999.", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Gracias por utilizar nuestros servicios.", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Atentamente,", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Horizon Bank", align="L")

        # Agregar una imagen Top
        pdf.image("Flask/Email/footer-horizon-bank.jpg", x=0, y=250, w=210)

        # Guardar el archivo PDF
        pdf.output(tipo+cedula+".pdf")
        
        return tipo+cedula+".pdf"
        
    elif tipo == 'creacion_usuario':
        print('PDF - Creacion de Usuario')
        # Agregar una imagen Top
        pdf.image("Flask/Email/logo-horizon-bank.jpg", x=0, y=0, w=210)
        # Escribir texto en el archivo PDF
        pdf.cell(pdf.w, 100, 'Fecha: '+fecha.strftime("%A")+', '+fecha.strftime("%d ")+
                    fecha.strftime('%B of')+fecha.strftime(" %Y")+
                    fecha.strftime(" %H:")+fecha.strftime("%M"), align="C")
        pdf.ln(70)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Notificacion", align="C")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, apellidos+' '+nombres, align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, 'Creacion de Usuario Exitosa!.', align="L")
        pdf.ln(20)
        pdf.cell(90, 10, "Usuario: ", border=1, align="C")
        pdf.cell(90, 10, 'XXXXXX'+cedula[-4:], border=1, align="C")
        pdf.ln()
        pdf.cell(90, 10, "Nombres: ", border=1, align="C")
        pdf.cell(90, 10, nombres, border=1, align="C")
        pdf.ln()
        pdf.cell(90, 10, "Apellidos: ", border=1, align="C")
        pdf.cell(90, 10, apellidos, border=1, align="C")
        pdf.ln()
        pdf.ln(10)  # Agregar un salto de línea
        # Escribir texto en el archivo PDF
        pdf.cell(pdf.w, 10, "Si no has solicitado este servicio, repórtalo a nuestra Banca Telefónica al (02)2999 999.", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Gracias por utilizar nuestros servicios.", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Atentamente,", align="L")
        pdf.ln(10)  # Agregar un salto de línea
        pdf.cell(pdf.w, 10, "Horizon Bank", align="L")

        # Agregar una imagen Top
        pdf.image("Flask/Email/footer-horizon-bank.jpg", x=0, y=250, w=210)

        # Guardar el archivo PDF
        pdf.output(tipo+cedula+".pdf")
        return tipo+cedula+".pdf"

