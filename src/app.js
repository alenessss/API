const express = require('express');
const sequelize = require('./config/database');
const appealsRouter = require('./routes/appeals.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Сервер работает');
  });

// Роуты
app.use('/api/appeals', appealsRouter);

// Обработка ошибок
app.use(errorHandler);

// Проверка соединения с БД и запуск сервера
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

module.exports = app