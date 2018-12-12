const { sequelize } = require('../config/db');
const Tag = sequelize.import('../schema/tags.js');

Tag.sync({force: false});

class tagModel { 
    // 创建标签
    static async createTag(request) {
        let { name } = request;
        let res = await Tag.create({
            name
        });
        return res;
    }

    // 获取标签
    static async getTags(request) {
        let res = await Tag.findAll({
            raw: true,
        });
        return res;
    }

    // 查找唯一标签
    static async checkTagsUnique(tags) {
        console.log(tags, 'tags');
        let res = await Tag.findAll({
            attributes: ['name'],
            raw: true,
            where: {
                name: tags
            }
        });
        let newTags = [];
        for(let i in tags) {
            if(!res.find(n => n.name === tags[i])) {
                newTags.push(tags[i])
            }
        }
        if(newTags.length > 0) {
            console.log(newTags, 'newTags');
            let insertArr = [];
            for(let i in newTags) {
                insertArr.push({name: newTags[i]})
            }
            Tag.bulkCreate(insertArr);
        }
        return res;
    }
}

module.exports = tagModel;