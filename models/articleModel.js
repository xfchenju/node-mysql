const { sequelize } = require('../config/db');
const Articles = sequelize.import('../schema/articles.js');
const moment = require('moment');

Articles.sync({force: false});

class articleModel {
    // 创建文章
    static async createArticle(ctx) {
        let author = ctx.state['user'].username;
        let { title, content, categoryId, category, banner, isTop } = ctx.request.body;
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
        let { title, author, fieldName, sortRule } = request;
        // 排序
        let order = [['id', 'desc']]
        if(fieldName && sortRule) {
            order.splice(0, 0, [fieldName, sortRule])
        }
        let res = await Articles.findAll({
            where: {
                title: {
                    $like: `%${title || ''}%`
                },
                author: {
                    $like: `%${author || ''}%`
                }
            },
            order: order
        });
        return res;
    }
    
    // 获取文章详情
    static async getArticleDetail(id) {
        let res = await Articles.findOne({
            where: {
                id: id
            }
        });
        return res;
    }

    // 修改文章
    static async updateArticle(request) {
        let { id, title, content, isTop, category, categoryId } = request;
        let res = await Articles.update({
            title, 
            content,
            isTop,
            category,
            categoryId
        },{
            where: {
                id: id
            }
        })
        return res;
    }

    // 删除文章
    static async deleteArticle(id) {
        let res = await Articles.destroy({
            where: {
                id: id
            }
        });
        return res;
    }
}

module.exports = articleModel;