const
	catchAsync = require('../utils/catchAsync'),
	Cart = require('../models/cartModel'),
	razorpay = require('razorpay'),
	shortid = require('shortid'),
	AppError = require('../utils/appError'),
	crypto = require('crypto');



var cart = new Cart();


exports.getcartprice = catchAsync(async (req, res, next) => {



	cart = new Cart(req.session.cart);
	console.log(res.cart);

	next()

})


const razorpayInstance = new razorpay({

	// Replace with your key_id
	key_id: process.env.Razorpay_KeyID,

	// Replace with your key_secret
	key_secret: process.env.Razorpay_SecretKey
});


console.log(cart)

exports.createOrder = catchAsync(async (req, res, next) => {
	// console.log(req.session);
	// console.log(req.cookies);
	// console.log(cookies);

	const {oder_id, payment_id,razorpay_signature} = req.body; 

	const payment_capture = 1
	const amount = (cart.totalPrice + cart.totalPrice / 10) * 100
	const currency = 'INR'




	const options = {
		amount: amount,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	let response;
	try {
		response = await razorpayInstance.orders.create(options)

		console.log(response)

		res.json({
			o_id: response.id,
			currency: response.currency,
			amount: response.amount,
			
		})
		
	} catch (error) {
		console.log(error);
		next(new AppError(error));
	}
});

exports.cartverify = catchAsync(async (req, res, next) => {

	
	const {oder_id, payment_id,razorpay_signature} = req.body; 

	

		// Pass yours key_secret here
		const key_secret = process.env.Razorpay_SecretKey;     
          
		// STEP 8: Verification & Send Response to User
		  
		// Creating hmac object 
		let hmac = crypto.createHmac('sha256', key_secret); 
	  
		// Passing the data to be hashed
		hmac.update(oder_id + "|" + payment_id);
		  
		// Creating the hmac in the required format
		const generated_signature = hmac.digest('hex');
		  
		  
		if(razorpay_signature===generated_signature){
		   return res.json({success:true, message:"Payment has been verified"})
		}
		

	
		next(new AppError('error payment not done'));


})

