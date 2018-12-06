const categoryModel = require('../models/categoryModel');
const qs = require('querystring');

class categoryController {
    // 获取分类列表
    static async getCategorys(ctx) {
        let request = qs.parse(ctx.request.querystring);
        let res = await categoryModel.getCategorys(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                categorys: res
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 获取启用的分类
    static async getActiveCategorys(ctx) {
        let res = await categoryModel.getActiveCategorys();
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                avtiveCategorys: res
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 新增分类
    static async createCategory(ctx) {
        let request = ctx.request.body;
        console.log(request, 'request-add');
        let res = await categoryModel.createCategory(request);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '新增分类成功!'
        }
    }

    // 更新分类
    static async updateCategory(ctx) {
        let request = ctx.request.body;
        let res = await categoryModel.updateCategory(request);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '更新分类成功!'
        }
    }

    // 禁用/启用分类
    static async isEnableCategory(ctx) {
        let request = ctx.request.body;
        let res = await categoryModel.isEnableCategory(request);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '操作成功!'
        }
    }

    // 删除分类
    static async deleteCategory(ctx) {
        let id = ctx.request.body.id;
        let res = await categoryModel.deleteCategory(id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '删除分类成功!'
        }
    }
}

module.exports = categoryController;