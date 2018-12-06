const articleModel = require('../models/articleModel');
const qs = require('querystring');

class articleController {
    // 获取分类列表
    static async getArticles(ctx) {
        let request = qs.parse(ctx.request.querystring);
        let res = await articleModel.getArticles(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                categorys: res
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 获取文章详情
    static async getArticleDetail(ctx) {
        let request = qs.parse(ctx.request.querystring);
        let res = await articleModel.getArticleDetail(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                categorys: res
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 新增文章
    static async createArticle(ctx) {
        let request = ctx.request.body;
        let res = await articleModel.createArticle(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                categorys: res
            },
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
            data: {
                categorys: res
            },
            code: 200,
            msg: '更新文章成功!'
        }
    }

    // 删除文章
    static async deleteArticle(ctx) {
        let request = ctx.request.body;
        let res = await articleModel.deleteArticle(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                categorys: res
            },
            code: 200,
            msg: '删除文章成功!'
        }
    }
}

module.exports = articleController;