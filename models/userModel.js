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
        console.log(user, 'user');
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
                loginStatus = true;
            }
        });

        return loginStatus;
    }
}

module.exports = UserModel;