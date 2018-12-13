const articleModel = require('../models/articleModel');
const tagModel = require('../models/tagModel');
const qs = require('querystring');

class articleController {
    // 获取文章列表
    static async getArticles(ctx) {
        let request = qs.parse(ctx.request.querystring);
        let res = await articleModel.getArticles(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                articles: res
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 根据分类id获取文章列表
    static async getArticlesByCategoryId(ctx) {
        let request = qs.parse(ctx.request.querystring);
        let res = await articleModel.getArticlesByCategoryId(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                articles: res,
                category: {
                    'name': 'name'
                }
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 根据标签获取文章列表
    static async getArticlesByTag(ctx) {
        let request = qs.parse(ctx.request.querystring);
        let res = await articleModel.getArticlesByTag(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                articles: res,
                category: {
                    'name': 'name'
                }
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 获取文章详情
    static async getArticleDetail(ctx) {
        let request = qs.parse(ctx.request.querystring);
        let res = await articleModel.getArticleDetail(request.id);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                detail: res
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 新增文章
    static async createArticle(ctx) {
        let tags = ctx.request.body.tags;

        tagModel.checkTagsUnique(JSON.parse(tags));
        await articleModel.createArticle(ctx);
        
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '新增文章成功!'
        }
    }

    // 更新文章
    static async updateArticle(ctx) {
        let request = ctx.request.body;
        let res = await articleModel.updateArticle(request);
        
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '更新文章成功!'
        }
    }

    // 删除文章
    static async deleteArticle(ctx) {
        let request = ctx.request.body;
        let res = await articleModel.deleteArticle(request.id);
        
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '删除文章成功!'
        }
    }
}

module.exports = articleController;