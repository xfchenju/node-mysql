const config = {
    // 启动端口
    port: 3000,

    // 数据库配置
    database: {
        DATABASE: 'my-blog',
        USERNAME: 'root',
        PASSWORD: '',
        PORT: '3306',
        HOST: 'localhost',
        TYPE: 'mysql',
        POOL: {
            max: 5,
            min: 0,
            idle: 10000
        },
        TIMEZONE: '+08:00' //东八区
    }
};

module.exports = config;