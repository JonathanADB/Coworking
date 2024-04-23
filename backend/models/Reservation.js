import { DataTypes, Sequelize } from 'sequelize';

const Reservation = Sequelize.define('Reservation', {
    spaceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default Reservation;