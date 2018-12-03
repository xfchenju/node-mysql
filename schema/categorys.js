module.exports = (sequelize, Sequelize) => {
    return sequelize.define('categorys', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '分类名称'
        },
        parentId: {
            type: Sequelize.INTEGER,
            field: 'parent_id',
            allowNull: false,
            comment: '父级分类ID，顶级分类为0',
            defaultValue: 0
        },
        order: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '分类排序'
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true
    });
}