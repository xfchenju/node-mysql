const Koa = require('koa');
const app = new Koa();
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');
const jwtKoa = require('koa-jwt');
const index = require('./routes/index');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');
const secret = 'secret';

const moment = require('moment');
    
const userController = require('./controllers/userController');

/**
 * middlewares
 */
// 跨域
app.use(cors());


app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 400*1024*1024 // 设置上传文件大小最大限制，默认2M
    }
}));

// http请求体解析
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));

// jwt认证
app.use(jwtKoa({secret: 'secret'}).unless({
    //数组中的路径不需要通过jwt验证
    path: [/^\/api\/v1\/user\/login/, 
           /^\/api\/v1\/user\/register/,
           /^\/api\/v1\/currency/,
           /^\/api\/v1\/home/,
           /^\/public/],
}));

// token验证中间件
app.use(async(ctx, next) => {
    var token = ctx.header.authorization;
    if(token) {
        let decodedToken;
        let nowTime = moment().unix();
        // 解析token
        await jwt.verify(token.split(" ")[1], secret, function(err, decoded) {
            if (err) throw err;
            decodedToken = decoded;
        });
        // 判断是否过期
        if(nowTime >= decodedToken.exp) {
            ctx.response.status = 403;
            return ctx.body = {
                code: 403,
                msg: 'token已过期!'
            }
        }
        console.log(`token还有${decodedToken.exp - nowTime}秒过期.`)
        // 存储解析后的token
        ctx.state['user'] = decodedToken;
        // 验证token是否是用户登录的token
        let tokenStatus = false;
        await userController.checkToken(ctx).then((res)=>{
            tokenStatus = res;
        });
        if(!tokenStatus) {
            return ctx.body = {
                code: 403,
                msg: '异常token!'
            }
        }
    }
    console.log('验证token通过')
    return next();
});

// routes
app.use(index.routes(), index.allowedMethods());

app.listen(3002);
console.log('listening to port 3002');