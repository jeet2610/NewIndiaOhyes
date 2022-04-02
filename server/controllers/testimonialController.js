const Testimonial = require('../models/testimonialModel');
const factory = require('./handlerFactory');

// Controllers
exports.createTestimonial = factory.createOne(Testimonial);
exports.getAllTestimonials = factory.getAll(Testimonial);
exports.getTestimonial = factory.getOne(Testimonial);
exports.updateTestimonial = factory.updateOne(Testimonial);
exports.deleteTestimonial = factory.deleteOne(Testimonial);