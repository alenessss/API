function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        details: err.errors.map(e => e.message)
      });
    }
  
    if (err.message === 'Нельзя взять в работу') {
      return res.status(400).json({ error: err.message });
    }
  
    if (err.message === 'Нельзя завершить') {
      return res.status(400).json({ error: err.message });
    }
  
    if (err.message === "Нельзя отменить обращение, которое не находится в статусе 'В работе'.") {
      return res.status(400).json({ error: err.message });
    }
  
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
  module.exports = errorHandler;