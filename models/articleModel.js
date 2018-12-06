const { sequelize } = require('../config/db');
const Articles = sequelize.import('../schema/articles.js');
const moment = require('moment');

Articles.sync({force: false});

class articleModel {
    // 创建文章
    static async createArticle(request) {
        let { title, content, author, categoryId, category, banner, isTop } = request;
        console.log('request', request);
        return false;
        let res = await Articles.create({
            title,
            content,
            author,
            categoryId,
            category,
            banner,
            isTop,
        });
        return res;
    }

    // 获取文章列表
    static async getArticles(request) {

    }
    
    // 获取文章详情
    static async getArticleDetail(id) {
        
    }

    // 修改文章
    static async updateArticle(request) {
        let { id, title, content } = request
        
    }

    // 删除文章
    static async deleteArticle(id) {
        
    }
}

module.exports = articleModel;