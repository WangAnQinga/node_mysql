var Sequelize = require('sequelize');
var config = require("./mysql-config");
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
var model = {};

model.user = sequelize.define('user', {
    userId: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    userName: Sequelize.STRING(200),
    password: Sequelize.STRING(9000),
    createTime: Sequelize.STRING,
    updateTime: Sequelize.STRING
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true //默认表名复数，为true,表名为单数

});
// model.user.sync({force: true})
model.user.sync().then(function() {
    // 已创建数据表
    console.log('已创建数据库')
});;



//微博
// model.weibo = sequelize.define('weibo', {
//     title: Sequelize.STRING(200),
//     content: Sequelize.STRING(9000),
//     create_time: Sequelize.BIGINT,
//     remark: Sequelize.STRING(700),
//     uid: Sequelize.BIGINT,
//     wei_id: { type: Sequelize.BIGINT, unique: true },
//     unix_time: Sequelize.BIGINT,

// }, {
//     timestamps: false
// });

// //微博评论
// model.weibocom = sequelize.define('weibocom', {
//     title: Sequelize.STRING(200),
//     content: Sequelize.STRING(9000),
//     create_time: Sequelize.BIGINT,
//     remark: Sequelize.STRING(700),
//     wei_id: { type: Sequelize.BIGINT, unique: true }

// }, {
//     timestamps: false
// });

// //微博博主
// model.weiboer = sequelize.define('weiboer', {
//     uid: { type: Sequelize.BIGINT, unique: true },
//     nick: Sequelize.STRING(200),
//     face: Sequelize.STRING(200),
//     profile: Sequelize.STRING(4000),
//     created_at: Sequelize.BIGINT,
// }, {
//     timestamps: false
// });

module.exports = model;