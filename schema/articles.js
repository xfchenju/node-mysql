//const moment = require('moment');
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('articles', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '文章标题'
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
            comment: '文章内容'
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '作者'
        },
        viewCount: {
            type: Sequelize.INTEGER,
            field: 'view_count',
            allowNull: false,
            comment: '浏览次数',
            defaultValue: 0
        },
        tags: {
            type: Sequelize.STRING,
            field: 'tags',
            allowNull: false,
            comment: '标签',
        },
        categoryId: {
            type: Sequelize.INTEGER,
            field: 'category_id',
            allowNull: false,
            comment: '分类ID',
        },
        category: {
            type: Sequelize.STRING,
            field: 'category',
            allowNull: false,
            comment: '分类名',
        },
        banner: {
            type: Sequelize.STRING,
            comment: '文章封面(图片名)',
        },
        isTop: {
            type: Sequelize.BOOLEAN,
            field: 'is_top',
            allowNull: false,
            comment: '是否置顶',
            defaultValue: false
        },
        articleStatus: {
            type: Sequelize.INTEGER,
            field: 'article_status',
            allowNull: false,
            comment: '文章状态',
            defaultValue: 0
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true
    });
}