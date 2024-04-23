//import { DataTypes, Model } from 'sequelize';

import { Sequelize } from "sequelize";


const Space = Sequelize.define('Space', {
    name: {
        type: dataTypes.STRING,
        allowNull: false
    },
    address: {
        type: dataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: dataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: dataTypes.FLOAT,
        allowNull: false
    }
});

export default Space;