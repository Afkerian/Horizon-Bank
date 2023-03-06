import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

def send_email(asunto, destinatario, cuerpo_mensaje, path):

    # Datos del remitente
    remitente = 'horizon.bank.info@gmail.com'
    password = 'ymoubsomgjvejdpo'
    # Datos del destinatario
    destinatario = destinatario

    # Crear el objeto mensaje
    mensaje = MIMEMultipart()
    mensaje['From'] = remitente
    mensaje['To'] = destinatario
    mensaje['Subject'] = asunto

    # Agregar el cuerpo del mensaje
    cuerpo = cuerpo_mensaje
    mensaje.attach(MIMEText(cuerpo, 'plain'))

    # Adjuntar un archivo al mensaje
    archivo_adjunto = path
    archivo = open(archivo_adjunto, 'rb')
    parte = MIMEBase('application', 'octet-stream')
    parte.set_payload((archivo).read())
    encoders.encode_base64(parte)
    parte.add_header('Content-Disposition', "attachment; filename= %s" % archivo_adjunto.split("/")[-1])
    mensaje.attach(parte)

    # Crear la conexión con el servidor SMTP de Gmail
    servidor = smtplib.SMTP('smtp.gmail.com', 587)
    servidor.starttls()
    servidor.login(remitente, password)

    # Enviar el mensaje
    texto = mensaje.as_string()
    servidor.sendmail(remitente, destinatario, texto)

    # Cerrar la conexión con el servidor SMTP de Gmail
    servidor.quit()

