const { Appeal } = require('../models');
const { Op } = require('sequelize');

class AppealsService {
    static async createAppeal(topic, message) {
        return await Appeal.create({ topic, message });
    }

    static async getAppealById(id) {
        return await Appeal.findByPk(id);
    }

    static async getAppeals(filters = {}) {
        const { date, startDate, endDate, status } = filters;
        const where = {};

        if (date) {
            // Фильтрация по одной конкретной дате
            const start = new Date(date);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            where.createdAt = { [Op.between]: [start, end] };
        } else if (startDate && endDate) {
            // Фильтрация по диапазону дат
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999); // Включаем конец дня
            where.createdAt = { [Op.between]: [start, end] };
        }

        if (status) {
            const statusMap = {
                new: 'Новое',
                'новое': 'Новое',
                processing: 'В работе',
                'в работе': 'В работе',
                done: 'Завершено',
                'завершено': 'Завершено',
                cancelled: 'Отменено',
                'отменено': 'Отменено',
                'Новое': 'Новое',
                'В работе': 'В работе',
                'Завершено': 'Завершено',
                'Отменено': 'Отменено'
            };

            const normalizedStatus = status.trim().toLowerCase();
            const mappedStatus = statusMap[normalizedStatus];

            if (!mappedStatus) {
                throw new Error(`Недопустимый статус: ${status}`);
            }

            where.status = mappedStatus;
        }


        return await Appeal.findAll({ where });
    }

    static async startAppeal(id) {
        const appeal = await Appeal.findByPk(id);
        if (!appeal || appeal.status !== 'Новое') {
            throw new Error('Нельзя взять в работу');
        }
        return await appeal.update({ status: 'В работе' });
    }

    static async completeAppeal(id, resolution) {
        const appeal = await Appeal.findByPk(id);
        if (!appeal || appeal.status !== 'В работе') {
            throw new Error('Нельзя завершить');
        }
        return await appeal.update({ status: 'Завершено', resolution });
    }

    static async cancelAppeal(id, reason) {
        const appeal = await Appeal.findByPk(id);
        if (!appeal || appeal.status !== 'В работе') {
            throw new Error('Нельзя отменить обращение, которое не находится в статусе "В работе".');
        }
        return await appeal.update({ status: 'Отменено', cancellationReason: reason });
    }

    static async cancelAllInProgress(reason = 'Массовая отмена администратором') {
        const [count] = await Appeal.update(
            { status: 'Отменено', cancellationReason: reason },
            { where: { status: 'В работе' } }
        );
        return count;
    }
}

module.exports = AppealsService;