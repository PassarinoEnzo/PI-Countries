const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 24
            }
        },
        season: {
            type: DataTypes.ENUM,
            values: ['Verano', 'Otoño', 'Invierno', 'Primavera'],
            allowNull: false
        }
    }, { timestamps: false});
}