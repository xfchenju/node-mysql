const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify); // 解密
const secret = 'secret';
const moment = require('moment');
const qs = require('querystring');

class userController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise<void>}
     */
    static async create(ctx) {
        const user = ctx.request.body;

        let createRes = await userModel.create(user);

        if(createRes.code === 0) {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '注册成功!'
            }
        }else {
            if(createRes.isExistedUsername) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 205,
                    msg: '该用户名已存在'
                }
            }else if(createRes.isExistedEmail) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 205,
                    msg: '该邮箱已存在'
                }
            }else {
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '异常错误!'
                }
            }
        }
    }

    static async login(ctx) {
        const user = ctx.request.body;
        
        await userModel.login(user).then(async (res)=>{
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

    // 获取用户列表
    static async getUsersList(ctx) {
        let request = qs.parse(ctx.request.querystring);
        await userModel.getUsersList(request).then((res)=>{
            ctx.response.status = 200;
            ctx.body = {
                data: {
                    users: res
                },
                code: 200,
                msg: '获取数据成功!'
            }
        });
    }

    static async checkToken(ctx) {
        let tokenStatus = false;
        let rememberToken = ctx.header.authorization.split(' ')[1];
        let id = ctx.state['user'].id;
        await userModel.getRememberTokenById(id).then(async(res)=>{
            if(rememberToken == res.rememberToken) {
                tokenStatus = true;
            }
        });
        return tokenStatus;
    }

    static async logout(ctx) {
        var user = ctx.state['user'];
        await userModel.logout(user.id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '注销成功！'
        }
    }

    // 更新用户信息
    static async updateUser(ctx) {
        let user = ctx.request.body;
        console.log(user, 'ctx-update');
        let res = await userModel.updateUser(user);
        if(res) {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '更新成功！'
            }
        }
    }

    // 删除用户
    static async deleteUser(ctx) {
        console.log(ctx, 'ctx-delete')
        let id = ctx.request.body.id;
        let res = await userModel.deleteUser(id);
        if(res) {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除成功！'
            }
        }
    }

    // 修改密码成功
    static async changePassword(ctx) {
        let res = await userModel.changePassword(ctx);
        if(res) {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改密码成功！'
            }
        }
    }
}

module.exports = userController;