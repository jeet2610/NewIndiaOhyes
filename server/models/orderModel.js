const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        type: Object,
        required: [true, 'An order must belong to a products']
    }],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'An order must belong to a product']
    },

    totalPrice: Number
});

orderSchema.pre('save', async function (next) {
    await this.populate({ path: 'product', select: 'title price' }).execPopulate();
    this.totalPrice = this.quantity * this.price;
    next();
});


module.exports = mongoose.model('Order', orderSchema);