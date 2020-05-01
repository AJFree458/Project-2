/* eslint-disable indent */
module.exports = (sequelize, DataTypes) => {

    const Events = sequelize.define(
        'Events', {
            eventId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },

            eventTitle: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlphanumeric: true
                }
            },

            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlphanumeric: true
                }
            },

            eventStartDate: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlphanumeric: true
                }
            },

            eventStartTime: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlphanumeric: true
                }
            },

            eventEndDate: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isAlphanumeric: true
                }
            },

            eventEndTime: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isAlphanumeric: true
                }
            },

            regLimit: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    isNumeric: true
                }
            },

            duration: {
                type: DataTypes.DECIMAL(2),
                allowNull: true,
                validate: {
                    isNumeric: true
                }
            },

            effort: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isAlphanumeric: true
                }
            },

            eventSummary: {
                type: DataTypes.TEXT,
                allowNull: true,
                validate: {
                    isAlphanumeric: true
                }
            },

            eventDetail: {
                type: DataTypes.TEXT,
                allowNull: true,
                validate: {
                    isAlphanumeric: true
                }
            }

        })
}