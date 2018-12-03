module.exports = (sequelize, Sequelize) => {
    return sequelize.define('users', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            comment: '用户名'
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '密码'
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            comment: '电子邮箱'
        },
        avator: {
            type: Sequelize.STRING,
            comment: '头像'
        },
        phoneNumber: {
            type: Sequelize.INTEGER,
            field: 'phone_number',
            unique: true,
            comment: '手机号'
        },
        realname: {
            type: Sequelize.STRING,
            comment: '真实姓名'
        },
        rememberToken: {
            type: Sequelize.STRING,
            field: 'remember_token',
            comment: 'token'
        },
        userStatus: {
            type: Sequelize.INTEGER,
            field: 'user_status',
            comment: '用户状态',
            defaultValue: 0
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            field: 'is_admin',
            allowNull: false,
            comment: '是否是管理员',
            defaultValue: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            field: 'is_deleted',
            allowNull: false,
            comment: '是否已删除',
            defaultValue: false
        },
        lastLogin: {
            type: Sequelize.DATE,
            field: 'last_login',
            comment: '最后登录时间'
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true
    });
}