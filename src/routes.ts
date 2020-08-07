import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}


// Cadastro das Classes (Users, Classes e Schedule)
routes.post('/classes', async (req, res) => {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = req.body;

    const trx = await db.transaction();

    try {
        // retornando os ids dos usuários 
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });

        const user_id = insertedUsersIds[0];

        // retornando os ids dos aulas
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id,

        })

        const class_id = insertedClassesIds[0];


        // tranformando o from e to em minutos
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to)
            };
        });

        // cadastrando o schedule
        await trx('class_schedule').insert(classSchedule)


        // realizar o cadastro dos 3 (Users, Classes e Schedule)
        await trx.commit();

        return res.status(201).send();
    } catch (err) {
        // Desfaz todas as alteraçoes aocorridas com o trx
        await trx.rollback();

        return res.status(400).json({
            error: 'Erro inesperado na criação da Nova Aula'
        })
    }
});

export default routes;
