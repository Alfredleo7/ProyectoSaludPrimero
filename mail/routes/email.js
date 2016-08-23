var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://jcalvarez9444%40gmail.com:050JuliaN271@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo" <foo@blurdybloop.com>', // sender address
    to: 'julian.tx94@gmail.com', // list of receivers
    subject: 'Hello Nodemailer', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};


/* GET home page. */
router.get('/', function(req, res, next) {
	
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
  
});

module.exports = router;










