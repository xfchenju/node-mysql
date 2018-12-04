const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify); // 解密
const secret = 'secret';
const moment = require('moment');

class userController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise<void>}
     */
    static async create(ctx) {
        const user = ctx.request.body;

        await userModel.create(user);

        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '注册成功!'
        }
    }

    static async login(ctx) {
        const user = ctx.request.body;
        
        await userModel.login(user).then(async (res)=>{
            console.log('res', res);
            if(res) {
                // 生成token
                const token = jwt.sign(res, secret, { expiresIn: '24h' });

                // 存放token
                await userModel.updateUserToken(res.id, token);

                ctx.response.status = 200;
                ctx.body = {
                    data: {
                        user: res,
                        token: token
                    },
                    code: 200,
                    msg: '登录成功!'
                }
            }else {
                ctx.response.status = 200;
                ctx.body = {
                    code: 401,
                    msg: '用户名或密码错误!'
                } 
            }
        }).catch((err)=>{
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: err
            }
        })
    }

    static async getAllUsers(ctx) {
        await userModel.getAllUsers().then((res)=>{
            ctx.response.status = 200;
            ctx.body = {
                data: {
                    users: res
                },
                code: 200,
                msg: '获取数据成功!'
            }
        })
    }

    static async checkToken(ctx) {
        let tokenStatus = false;
        let rememberToken = ctx.header.authorization;
        let id = ctx.state['user'].id;
        await userModel.getRememberTokenById(id).then(async(res)=>{
            if(rememberToken == res.rememberToken) {
                tokenStatus = true;
            }
            console.log(rememberToken, res.rememberToken)
        });
        console.log('tokenStatus', tokenStatus);
        return tokenStatus;
    }

    static async logout(ctx) {
        var user = ctx.state['user'];
        await userModel.logout(user.id);
        return true;
    }
}

module.exports = userController;