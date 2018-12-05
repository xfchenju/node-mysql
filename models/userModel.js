const { sequelize } = require('../config/db');
const User = sequelize.import('../schema/users');
const moment = require('moment');

User.sync({force: false});

class UserModel {
    /**
     * 创建用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async create(user) {
        let { email, username, password, phoneNumber, realname } = user;

        let res = {
            code: 0,
            isExistedUsername: null,
            isExistedEmail: null
        };
        // 检查唯一字段是否存在
        res.isExistedUsername = await User.findOne({
            where: {
                username: username
            }
        });
        res.isExistedEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if(res.isExistedUsername || res.isExistedEmail) {
            res.code = 1;
            return res;
        }
        // 创建账号操作
        await User.create({
            email,
            username,
            password,
            phoneNumber,
            realname
        })
        return res;
    }

    static async getUserByName() {}

    static async login(user) {
        let { username, password } = user;
        let loginStatus = false;

        await User.findOne({
            raw: true,
            where: {
                username: username,
                password: password
            }
        }).then((res)=>{
            if(res) {
                let reData = {
                    id: res.id,
                    username: res.username,
                    avator: res.avator
                }
                loginStatus = reData;
            }
        });
        return loginStatus;
    }

    // 注销
    static async logout(id) {
        await User.update({
            rememberToken: ''
        }, {
            where: {
                id: id
            }
        });
        return true;
    }

    // 获取所有用户
    static async getAllUsers() {
        let rowData = [];

        await User.findAll({
            raw: true
        }).then((res)=>{
            if(res) {
                rowData = res;
            }
        })
        
        return rowData;
    }

    // 获取用户列表
    static async getUsersList(request) {
        let rowData = [];
        // 用户名搜索
        let name = request.username || '';
        // 排序
        let fieldName = request.fieldName || '';
        let sortRule = request.sortRule || '';
        let userOrder = [['id', 'desc']];
        if(fieldName && sortRule) {
            userOrder.push([fieldName, sortRule]);
        }
        await User.findAll({
            raw: true,
            where: {
                username: {
                    '$like': `%${name}%`
                }
            },
            order: userOrder
        }).then((res)=>{
            if(res) {
                rowData = res;
            }
        })
        
        return rowData;
    }

    // 更新用户的token
    static async updateUserToken(id, token) {
        await User.update({
            rememberToken: token,
            lastLogin: moment().format('YYYY-MM-DD HH:mm:ss')
        }, {
            where: {
                id: id
            }
        });

        return true;
    }

    // 获取用户的token根据id
    static async getRememberTokenById(id) {
        let rememberToken = '';
        await User.findOne({
            where: {
                id: id
            }
        }).then((res)=>{
            rememberToken = res;
        });
        return rememberToken;
    }
}

module.exports = UserModel;