import cron from 'node-cron';
import { getPool } from './database/getPool.js';

const pool = getPool();

const updateReservationStatus = async () => {
    console.log('Actualizando estado de las reservas...');
    const query = `
    UPDATE reservations
    SET reservationCheckin = 1
    WHERE reservationCheckin = 0 AND reservationDateBeg <= CURRENT_DATE
    `;

    await pool.execute(query);
    console.log('Estado de las reservas actualizado');
}

const task = cron.schedule('15 * * * *', updateReservationStatus);

export { updateReservationStatus, task };