const { sequelize } = require('../config/db');
const Category = sequelize.import('../schema/categorys.js');
const Articles = sequelize.import('../schema/articles.js');
const moment = require('moment');

Category.sync({force: false});

class categoryModel { 
    // 创建分类
    static async createCategory(request) {
        let { name, order} = request;
        let res = await Category.create({
            name,
            order
        });
        return res;
    }

    // 更新分类
    static async updateCategory(request) {
        let { id, name, order, status} = request;
        order = Number.isNaN(Number(order)) ? 0 : Number(order);
        let res = await Category.update({
            name,
            order,
            status: status || 0
        }, {
            where: {
                id: id
            }
        });
        return res;
    }

    // 禁用/启用分类
    static async isEnableCategory(request) {
        let { id, status } = request
        let res = await Category.update({
            status
        },{
            where: {
                id: id
            }
        });
        return res;
    }

    // 删除分类
    static async deleteCategory(id) {
        let res = await Category.destroy({
            where: {
                id: id
            }
        });
        return res;
    }

    // 获取分类列表
    static async getCategorys(request) {
        let { name, status, fieldName, sortRule } = request;
        console.log(status, 'status');
        name = name || '';
        let where = {
                name: {
                    $like: `%${name}%`
                }
            }
        if(status) {
            where['status'] = status;
        }
        // 排序
        let order = [['id', 'asc']]
        if(fieldName && sortRule) {
            order.splice(0, 0, [fieldName, sortRule]);
        }
        let res = await Category.findAll({
            raw: true,
            where: where,
            order: order
        });
        return res;
    }

    // 获取分类列表以及每个分类的文章数量
    static async getCategorysAndCountArticles(request) {

        let result = await sequelize.query(`SELECT c.id, c.name, c.order, c.created_at, COUNT(a.id) as articles_num FROM categorys as c LEFT JOIN articles as a ON c.id = a.category_id GROUP BY c.id`);
        
        return result;
        // Articles.hasOne(Category, { foreignKey: 'category_id'});
        // Category.belongsTo(Articles, { foreignKey: 'id'});
        // let res = await Category.findAll({
        //     // raw: true,
        //     include: [{
        //         model: Articles
        //     }],
        //     // {
        //     //     status: 0
        //     // },
        //     order: [['order', 'asc'], ['id', 'desc']]
        // });
        // return res;
    }

    // 获取启用的分类
    static async getActiveCategorys(request) {
        let res = await Category.findAll({
            raw: true,
            where: {
                status: 0
            }
        });
        return res;
    }
}

module.exports = categoryModel;