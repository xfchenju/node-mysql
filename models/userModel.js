const { sequelize } = require('../config/db');
const User = sequelize.import('../schema/users');
const moment = require('moment');
const fs = require('fs');

User.sync({force: false});

class UserModel {
    /**
     *创建用户
     *
     * @static
     * @param {*} user
     * @returns
     * @memberof UserModel
     */
    static async create(user) {
        let { email, username, password, phoneNumber, realname, isAdmin, avator } = user;
        console.log('user', user);
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
            realname,
            isAdmin,
            avator
        });
        return res;
    }

    /**
     *登录接口
     *
     * @static
     * @param {*} user
     * @returns
     * @memberof UserModel
     */
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

    
    /**
     *注销接口
     *
     * @static
     * @param {*} id
     * @returns
     * @memberof UserModel
     */
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
    
    /**
     *获取所有用户
     *
     * @static
     * @returns
     * @memberof UserModel
     */
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
    
    /**
     *获取用户列表
     *
     * @static
     * @param {*} request
     * @returns
     * @memberof UserModel
     */
    static async getUsersList(request) {
        let rowData = [];
        // 用户名搜索
        let name = request.username || '';
        // 排序
        let fieldName = request.fieldName || '';
        let sortRule = request.sortRule || '';
        let userOrder = [['id', 'desc']];
        if(fieldName && sortRule) {
            userOrder.splice(0, 0, [fieldName, sortRule]);
        }
        await User.findAll({
            raw: true,
            where: {
                username: {
                    '$like': `%${name}%`
                },
                isDeleted: false
            },
            order: userOrder
        }).then((res)=>{
            if(res) {
                rowData = res;
            }
        })
        
        return rowData;
    }
    
    /**
     *更新用户的token
     *
     * @static
     * @param {*} id
     * @param {*} token
     * @returns
     * @memberof UserModel
     */
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

    /**
     *获取用户的token根据id
     *
     * @static
     * @param {*} id
     * @returns
     * @memberof UserModel
     */
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
 
    /**
     *更新用户信息
     *
     * @static
     * @param {*} request
     * @returns
     * @memberof UserModel
     */
    static async updateUser(request) {
        let { id, phoneNumber, realname, isAdmin, avator } = request;
        // 查询原头像
        let sourceArr = await User.findOne({
            raw: true,
            where: {
                id: id
            }
        });
        // 如果上传了新头像 这里要删除原头像
        if(sourceArr.avator && sourceArr.avator != avator) {
            fs.unlink(sourceArr.avator, (err) => {
                if (err) throw err;
                console.log('文件已删除');
            });
        }
        let res = await User.update({
            phoneNumber,
            realname,
            isAdmin,
            avator
        },{
            where: {
                id: id
            }
        })
        return res;
    }
    
    /**
     *删除用户
     *
     * @static
     * @param {*} id
     * @returns
     * @memberof UserModel
     */
    static async deleteUser(id) {
        let res = await User.update({
            rememberToken: '',
            isDeleted: true
        },{
            where: {
                id: id
            }
        });
        return res;
    }
}

module.exports = UserModel;