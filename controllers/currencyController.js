const fs = require('fs');
const path = require('path');
const moment = require('moment');

class currencyController {
    static async upload(ctx) {
        // 上传单个文件
        const file = ctx.request.files.file; // 获取上传文件
        const fileSourceNameArr = file.name.split(".");
        const suffix = fileSourceNameArr[fileSourceNameArr.length - 1];
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filename = moment().format('YYYYMMDDHHmmss') + Math.random().toString(36).substr(2) + `.${suffix}`;
        let filePath = path.join(__dirname, '../public/upload/') + filename;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        console.log('文件上传成功！');
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        ctx.response.status = 200;
        return ctx.body = {
            code: 200,
            data: {
                src: filePath
            }
        };
    }
}

module.exports = currencyController;