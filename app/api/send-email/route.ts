import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, apellido, email, telefono, pais, empresa, cargo, mensaje } = body;

    // Validar datos requeridos
    if (!nombre || !apellido || !email) {
      return NextResponse.json(
        { error: 'Nombre, apellido y email son requeridos' },
        { status: 400 }
      );
    }

    // Configurar transporter de nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verificar conexión SMTP
    await transporter.verify();

    // Plantilla de email principal
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: [process.env.TO_EMAIL, 'eventosinteligentes@codeaevents.com'],
      subject: `🎯 Nuevo registro CODEa Mining Fest - ${nombre} ${apellido}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #1f2937;">📧 Nuevo Registro</h1>
            <p style="margin: 10px 0 0 0; color: #374151; font-size: 16px;">CODEa Mining Fest 2026</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px;">
            <h2 style="color: #fbbf24; margin-bottom: 30px; font-size: 24px;">👤 Información del Contacto</h2>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
              <div style="display: grid; gap: 15px;">
                <div><strong style="color: #fbbf24;">Nombre:</strong> ${nombre} ${apellido}</div>
                <div><strong style="color: #fbbf24;">Email:</strong> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></div>
                ${telefono ? `<div><strong style="color: #fbbf24;">Teléfono:</strong> ${telefono}</div>` : ''}
                ${pais ? `<div><strong style="color: #fbbf24;">País:</strong> ${pais}</div>` : ''}
                ${empresa ? `<div><strong style="color: #fbbf24;">Empresa:</strong> ${empresa}</div>` : ''}
                ${cargo ? `<div><strong style="color: #fbbf24;">Cargo:</strong> ${cargo}</div>` : ''}
              </div>
            </div>

            ${mensaje ? `
              <div style="background: rgba(59, 130, 246, 0.1); padding: 25px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #60a5fa; margin-bottom: 15px;">💬 Mensaje:</h3>
                <p style="line-height: 1.6; margin: 0;">${mensaje}</p>
              </div>
            ` : ''}

            <!-- Footer Info -->
            <div style="margin-top: 30px; padding-top: 25px; border-top: 1px solid rgba(255, 255, 255, 0.2); text-align: center; color: #9ca3af;">
              <p style="margin: 5px 0;">📅 Fecha de registro: ${new Date().toLocaleDateString('es-PE')}</p>
              <p style="margin: 5px 0;">🕐 Hora: ${new Date().toLocaleTimeString('es-PE')}</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #0f172a; padding: 20px; text-align: center; color: #64748b;">
            <p style="margin: 0; font-size: 14px;">🚀 Generado automáticamente por CODEa Mining Fest 2026</p>
          </div>
        </div>
      `
    };

    // Enviar email principal
    await transporter.sendMail(mailOptions);

    // Email de confirmación para el usuario
    const confirmationMail = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: '✅ Confirmación de registro - CODEa Mining Fest 2026',
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(90deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: white;">✅ ¡Registro Confirmado!</h1>
            <p style="margin: 10px 0 0 0; color: #ecfdf5; font-size: 16px;">CODEa Mining Fest 2026</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px;">
            <h2 style="color: #10b981; margin-bottom: 20px;">¡Hola ${nombre}!</h2>
            
            <p style="line-height: 1.6; margin-bottom: 25px;">
              Gracias por tu interés en <strong style="color: #fbbf24;">CODEa Mining Fest 2026</strong>. 
              Hemos recibido tu registro correctamente y nos pondremos en contacto contigo pronto.
            </p>

            <div style="background: rgba(16, 185, 129, 0.1); padding: 25px; border-radius: 12px; border-left: 4px solid #10b981; margin-bottom: 25px;">
              <h3 style="color: #10b981; margin-bottom: 15px;">📧 Datos registrados:</h3>
              <div style="color: #e5e7eb;">
                <p style="margin: 8px 0;"><strong>Nombre:</strong> ${nombre} ${apellido}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                ${empresa ? `<p style="margin: 8px 0;"><strong>Empresa:</strong> ${empresa}</p>` : ''}
              </div>
            </div>

            <div style="background: rgba(59, 130, 246, 0.1); padding: 25px; border-radius: 12px; text-align: center;">
              <h3 style="color: #60a5fa; margin-bottom: 15px;">🚀 ¿Qué sigue?</h3>
              <p style="line-height: 1.6; margin: 0;">
                Nuestro equipo revisará tu información y te enviaremos más detalles sobre el evento, 
                incluyendo fechas, agenda y información de acceso.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #0f172a; padding: 20px; text-align: center; color: #64748b;">
            <p style="margin: 0 0 10px 0; font-size: 14px;">CODEa Mining Fest 2026 - El futuro de la minería</p>
            <p style="margin: 0; font-size: 12px;">Este es un email automático, por favor no responder.</p>
          </div>
        </div>
      `
    };

    // Enviar email de confirmación
    await transporter.sendMail(confirmationMail);

    return NextResponse.json(
      { message: 'Emails enviados exitosamente' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error enviando email:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}