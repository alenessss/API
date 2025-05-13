const AppealsService = require('../services/appeals.service');
const { validationResult } = require('express-validator');

exports.createAppeal = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { topic, message } = req.body;
    const appeal = await AppealsService.createAppeal(topic, message);
    res.status(201).json(appeal);
  } catch (err) {
    next(err);
  }
};

exports.getAppeals = async (req, res, next) => {
  try {
    const { date, startDate, endDate, status } = req.query;
    const appeals = await AppealsService.getAppeals({ date, startDate, endDate, status });
    res.json(appeals);
  } catch (err) {
    next(err);
  }
};

exports.startAppeal = async (req, res, next) => {
  try {
    const appeal = await AppealsService.startAppeal(req.params.id);
    res.json(appeal);
  } catch (err) {
    next(err);
  }
};

exports.completeAppeal = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const appeal = await AppealsService.completeAppeal(req.params.id, req.body.resolution);
    res.json(appeal);
  } catch (err) {
    next(err);
  }
};

exports.cancelAppeal = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const appeal = await AppealsService.cancelAppeal(req.params.id, req.body.reason);

    res.json(appeal);
  } catch (err) {
    next(err);
  }
};

exports.cancelAllInProgress = async (req, res, next) => {
  try {
    const count = await AppealsService.cancelAllInProgress(req.body.reason);
    res.json({ message: `Отменено ${count} обращений` });
  } catch (err) {
    next(err);
  }
};