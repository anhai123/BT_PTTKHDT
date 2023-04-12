const nodemailer = require('nodemailer');

sendEmail = (email, subject, text) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: `smpt.gmail.com`,
                service: `gmail`,
                port: 587,
                secure: true,
                auth: {
                    user: `tempab102@gmail.com`,
                    pass: `wcjazhakexrgwumy`
                }
            })

            await transporter.sendMail({
                from: `tempab102@gmail.com`,
                to: email,
                subject: subject,
                text: text
            })
            console.log(`Mail đã gửi!`)
            resolve();
        } catch (error) {
            console.log("error: ", err);
            return reject(err);
        }
    });
}

const email = {
    sendEmail: sendEmail,
};

module.exports = email;