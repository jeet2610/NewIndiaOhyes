const
    router = require('express').Router(),
    TestimonialController = require('../controllers/testimonialController');

router
    .route('/')
    .get(TestimonialController.getAllTestimonials)
    .post(TestimonialController.createTestimonial);

router
    .route('/:id')
    .get(TestimonialController.getTestimonial)
    .patch(TestimonialController.updateTestimonial)
    .delete(TestimonialController.deleteTestimonial);

module.exports = router;