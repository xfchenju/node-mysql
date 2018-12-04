const Router = require('koa-router')
const UserController = require('../controllers/userController');

const router = new Router({
    prefix: '/api/v1'
});

/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UserController.create);

// 用户登录
router.post('/user/login', UserController.login);

// 获取所有用户
router.get('/user/get-all-users', UserController.getAllUsers);

// 注销
router.get('/user/logout', UserController.logout);

module.exports = router;