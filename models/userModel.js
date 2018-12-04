const { sequelize } = require('../config/db');
const User = sequelize.import('../schema/users');

User.sync({force: false});

class UserModel {
    /**
     * 创建用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async create(user) {
        let { email, username, password, phone } = user;

        await User.create({
            email,
            username,
            password,
            phone
        })
        return true;
    }

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

    static async updateUserToken(id, token) {
        await User.update({
            rememberToken: token
        }, {
            where: {
                id: id
            }
        });

        return true;
    }

    static async getRememberTokenById(id) {
        let rememberToken = '';
        await User.findOne({
            rememberToken
        }, {
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