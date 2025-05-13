module.exports = (sequelize, DataTypes) => {
    const Appeal = sequelize.define('Appeal', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 100]
        }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [10, 2000]
        }
      },
      status: {
        type: DataTypes.ENUM('Новое', 'В работе', 'Завершено', 'Отменено'),
        defaultValue: 'Новое',
        allowNull: false
      },
      resolution: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 2000]
        }
      },
      cancellationReason: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 1000]
        }
      }
    }, {
      timestamps: true,
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ['deletedAt'] }
      }
    });
  
    return Appeal;
  };