const
    mongoose = require('mongoose'),

    User = require('./userModel'),
    Service = require('./serviceModel');

const bookingSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: [true, 'A booking must belong to a user']
    },

    service: {
        type: mongoose.Schema.ObjectId,
        ref: 'Service',
        required: [true, 'A booking must have a service']
    },

    selectedPackages: {
        type: [mongoose.Types.ObjectId],
        ref: 'Package',
        validate: {
            validator: function () { return this.selectedPackages.length; },
            message: 'A service must be booked with atleast one package'
        }
    },

    dateAndTimeOfEvent: {
        type: Date,
        default: Date.now()
    },

    instructions: String,

    total: Number
});

bookingSchema.pre('save', async function (next) {
    try {
        this.user = await User.findById(this.user, 'phone name');
        this.service = await Service.findById(this.service, 'title');

        this.populate('selectedPackages')

        this.total = this.selectedPackages.reduce((acc, cur) => acc + cur.price, 0);
        this.total = 199;
        console.log('🚀🚀🚀🚀🚀🚀🚀');
        console.log(this);
        next();
    }
    catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Booking', bookingSchema);