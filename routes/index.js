const Router = require('koa-router')
const UserController = require('../controllers/userController');
const CategoryController = require('../controllers/categoryController');
const ArticleController = require('../controllers/articleController');
const TagController = require('../controllers/tagController');
const CurrencyController = require('../controllers/currencyController');

const router = new Router({
    prefix: '/api/v1'
});


// 前台
// 文章列表
router.get('/home/articles/get-articles', ArticleController.getArticles);
// 文章详情
router.get('/home/articles/get-article-detail', ArticleController.getArticleDetail);
// 根据分类id获取文章列表
router.get('/home/articles/get-articles-by-category-id', ArticleController.getArticlesByCategoryId);
// 分类列表
router.get('/home/categories/get-categories', CategoryController.getCategorysAndCountArticles);


// 图片上传
router.post('/currency/upload', CurrencyController.upload);

/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 注销
router.post('/user/logout', UserController.logout);
// 修改密码
router.post('/user/change-password', UserController.changePassword);
// 获取所有用户
router.get('/user/get-users-list', UserController.getUsersList);
// 获取用户详情
//router.get('/user/get-user-detail', UserController.getUserDetail);
// 修改用户信息
router.post('/user/update-user', UserController.updateUser);
// 删除用户
router.post('/user/delete-user', UserController.deleteUser);

/**
 * 分类接口
 */
// 获取分类列表
router.get('/category/get-categorys-list', CategoryController.getCategorys);
// 获取启用的分类
router.get('/category/get-active-categorys', CategoryController.getActiveCategorys);
// 新建分类
router.post('/category/create-category', CategoryController.createCategory);
// 更新分类
router.post('/category/update-category', CategoryController.updateCategory);
// 禁用/启用分类
router.post('/category/isenable-category', CategoryController.isEnableCategory);
// 删除分类
router.post('/category/delete-category', CategoryController.deleteCategory);

/**
 * 文章接口
 */
// 获取文章列表
router.get('/article/get-articles-list', ArticleController.getArticles);
// 获取文章详情
router.get('/article/get-article-detail', ArticleController.getArticleDetail);
// 新建文章
router.post('/article/create-article', ArticleController.createArticle);
// 更新文章
router.post('/article/update-article', ArticleController.updateArticle);
// 删除文章
router.post('/article/delete-article', ArticleController.deleteArticle);

// 获取标签
router.get('/tags/get-tags', TagController.getTags);

module.exports = router;