const userModel = require('../models/userModel');

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
        
        await userModel.login(user).then((res)=>{
            console.log('4', res)
            if(res) {
                ctx.response.status = 200;
                ctx.body = {
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
        }).catch((res)=>{
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: res
            }
        })


    }
    
}

module.exports = userController;