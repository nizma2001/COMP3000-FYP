
const {Sequelize, DataTypes} = require('sequelize');

console.log(process.env.CONNECTION_STRING); // Debugging step

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    logging: false,
});

//define user model with attributes to map to database

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING, // Matches VARCHAR in PostgreSQL
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING, // Matches `VARCHAR(50)` in PostgreSQL
        defaultValue: 'user',
    },
},
    {
        tableName: 'users',      //map to database table name
        timestamps: true,       
        createdAt: 'created_at', 
        updatedAt: false,        
    });
    
    module.exports = User;

