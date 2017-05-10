#! /usr/bin/python
# -*- coding: UTF-8 -*-
import smtplib  
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import sys
from django.conf import settings

class ContenidoMensaje():
    titulo      = ""
    fecha       = None
    
    def __init__(self, titulo, fecha, detalle_mensaje):
        self.titulo     = titulo
        self.fecha      = fecha
        self.detalle_mensaje  = detalle_mensaje
    

class EmailHoteleria():
    emitente    = ""
    emisor      = "carluchojordan@gmail.com"
    detalle_mensaje   = None
    
    def __init__(self, emitente, emisor, detalle_mensaje):
        self.emitente           = emitente
        self.emisor             = emisor
        self.detalle_mensaje    = detalle_mensaje
    
    def enviarMensaje(self):
        msg = MIMEMultipart('alternative')
        c = ""
        
        html = """\
                    <html>
                      <head>
                         <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/> 
                      </head>
                      <body>
                        <p style='color:white; font-size:18px; background:#3E96D6'>
                            titulo
                        </p>
                        <h2 style='color:black; font-size:16px'>"""+self.detalle_mensaje.titulo+""" </h2>
                        <div style="color:black; font-size:12px; border:#3E96D6">"""+(self.detalle_mensaje.detalle_mensaje)+"""</div>
                      </body>
                    </html>
                    """   
                    
        part2           = MIMEText(html, 'html', _charset='UTF-8')
        msg['Subject']  = (self.detalle_mensaje.titulo)
        msg['From']     = self.emitente
        msg['To']       = self.emisor
        
        msg.attach(part2)
            
        server = smtplib.SMTP('smtp.gmail.com:587')  
        server.starttls()  
        server.login("carluchojordan@gmail.com","XXXXXXXX")
        
        respuesta = server.sendmail(self.emitente, self.emisor ,msg.as_string())  
        server.quit()
        return respuesta