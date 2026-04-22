import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

interface EmailOptions {
    para: string;
    asunto: string;
    html: string;
}

export const enviarEmail = async ({ para, asunto, html }: EmailOptions) => {
    try {
        await transporter.sendMail({
            from: `"AWOS Autoescuela" <${process.env.GMAIL_USER}>`,
            to: para,
            subject: asunto,
            html,
        });
        console.log(`Correo enviado exitosamente a ${para}`);
    } catch (error) {
        console.error('Error enviando el correo:', error);
        // No lanzamos el error para evitar que se caiga la transacción principal de la BD
    }
};