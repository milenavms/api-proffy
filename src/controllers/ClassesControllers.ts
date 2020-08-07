import {Request, Response} from 'express'
import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../database/connection";

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassControllers{

    // listagem das aulas (3 filtros: dia da semana/materia/horario)
    async index(req: Request, res: Response){
        const filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time){
            return res.status(400).json({
                error: 'Ausência de filtros para listar aulas'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??',[Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <=  ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` >  ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

            return res.json(classes)

    }

    // criação das aulas
    async create(req: Request, res: Response){
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
    }
}