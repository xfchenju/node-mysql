const { sequelize } = require('../config/db');
const Category = sequelize.import('../schema/categorys.js');
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
        name = name || '';
        let where = {
                name: {
                    $like: `%${name}%`
                }
            }
        if(status !== '') {
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
}

module.exports = categoryModel;