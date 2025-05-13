const express = require('express');
const router = express.Router();
const controller = require('../controllers/appeals.controller');
const { body } = require('express-validator');

// Валидаторы
const validateCreateAppeal = [
    body('topic').trim().isLength({ min: 3, max: 100 }),
    body('message').trim().isLength({ min: 10, max: 2000 })
];

const validateCompleteAppeal = [
    body('resolution').trim().isLength({ min: 10, max: 2000 }).optional()
];

const validateCancelAppeal = [
    body('reason').trim().isLength({ min: 5, max: 1000 })
];

// Маршруты
router.post('/', validateCreateAppeal, controller.createAppeal);
router.get('/', controller.getAppeals);
router.put('/:id/start', controller.startAppeal);
router.put('/:id/complete', validateCompleteAppeal, controller.completeAppeal);
router.put('/:id/cancel', validateCancelAppeal, controller.cancelAppeal);
router.put('/cancel-all/in-progress', validateCancelAppeal, controller.cancelAllInProgress);

module.exports = router;