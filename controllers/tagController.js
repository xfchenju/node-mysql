const tagModel = require('../models/tagModel');
const qs = require('querystring');

class tagController {
    // 获取标签
    static async getTags(ctx) {
        let request = qs.parse(ctx.request.querystring);
        let res = await tagModel.getTags(request);
        
        ctx.response.status = 200;
        ctx.body = {
            data: {
                tags: res
            },
            code: 200,
            msg: '获取数据成功!'
        }
    }

    // 新增标签
    static async createTag(ctx) {
        let request = ctx.request.body;
        let res = await tagModel.createTag(request);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '新增分类成功!'
        }
    }
}

module.exports = tagController;