const Doctor = require('../db/models/doctor-schema');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// var generator = require('generate-password');
// const nodemailer = require('nodemailer');

require('dotenv').config();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

// module.exports.signup = async (req, res) => {
//   try {
//     const { email, firstname, department, hospital } = req.body;

//     const doctor = await Doctor.findOne({ email: email });
//     if (doctor) {
//       return res
//         .status(400)
//         .json({ message: 'Doctor already exist', error: true });
//     }

//     const generatedPassword = generator.generate({
//       length: 10,
//       numbers: true,
//     });

//     const hashedPassword = await bcrypt.hash(generatedPassword, 2);

//     const dbResponse = await Doctor.create({
//       email,
//       firstname,
//       password: hashedPassword,
//     });

//     transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'DOC APP PASSWORD',
//       text: `hi doc, please login to the app using the given password: ${generatedPassword}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         return res.status(201).json({ message: 'Doctor added', error: false });
//       }
//     });

//     await transporter.sendMail(mailOptions);

//   } catch (e) {
//     return res.status(500).json({ message: e.message, error: true });
//   }

// };

module.exports.signup = async (req, res) => {
  try {
    const { email, firstname, department, hospital } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res
        .status(400)
        .json({ message: 'Doctor already exists', error: true });
    }

    const generatedPassword = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: true,
    });

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const dbResponse = await Doctor.create({
      email,
      firstname,
      password: hashedPassword,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'DOC APP PASSWORD',
      text: `Hi ${firstname},\n\nPlease log in to the app using the following password: ${generatedPassword}\n\nBest regards,\nDOC App Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: 'Doctor added', error: false });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res
        .status(403)
        .json({ message: 'Email or Password incorrect', error: true });
    }
    const isMatching = await bcrypt.compare(password, doctor.password);
    if (!isMatching) {
      return res
        .status(403)
        .json({ message: 'Email or Password incorrect', error: true });
    }

    const token = jwt.sign(
      { id: doctor._id, role: 'DOCTOR' },
      process.env.SECRET_KEY,
      { expiresIn: '5d' }
    );

    return res
      .status(200)
      .json({ message: 'You are logged in', error: false, token });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};
