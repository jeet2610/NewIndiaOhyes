// Importing modules
const
    Order = require('../models/orderModel'),
    factory = require('./handlerFactory'),
    catchAsync = require('../utils/catchAsync'),
    AppError = require('../utils/appError'),
    User = require('../models/userModel'),
    Cart = require('../models/cartModel'),
    crypto = require('crypto');

// Controllers
exports.placeOrder = catchAsync(async (req, res, next) => {


    const cart = new Cart(req.session.cart);
    let order;
    
       

            const {oder_id, payment_id,razorpay_signature} = req.body; 

            
            order = await Order.create({
                user: req.user._id,
                products: cart,
        
            
            });

            console.log("😂😂😂"+order);

                
            
          
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

    // res.status(201).json({
    //     status: 'success',
    //     message: 'We will contact you in few minutes',
    //     data: {
    //         order
    //     }
    // });

})




exports.createOrder = factory.createOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);

exports.getMyOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.json({
        status: 'success',
        data: {
            orders
        }
    });
});




