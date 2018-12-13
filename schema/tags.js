module.exports = (sequelize, Sequelize) => {
    return sequelize.define('tags', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '标签名'
        },
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true
    });
}