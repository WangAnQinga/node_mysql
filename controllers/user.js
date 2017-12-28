let moment = require('moment');
let model = require('../database/model.js')
let bcrypt = require('bcryptjs');


module.exports = {
    userLogin(req, res) {
        (async() => {
            var userName = req.body.userName;
            var password = req.body.password;



            if (!userName) {
                return res.send({ code: 417, message: '用户名必须填！', result: null })
            }

            if (!password) {
                return res.send({ code: 417, message: '密码必须填！', result: null })
            }


            var lists = await model.user.findAll({ where: { userName: userName } });

            if (!lists.length) {
                res.send({ code: 417, message: '用户名不存在' })
            } else {
                console.log(lists[0].dataValues.password);
                bcrypt.compare(password, lists[0].dataValues.password, (err, sure) => {
                    if (sure) {
                        delete lists[0].dataValues.password
                        res.json({ code: 200, message: '登录成功', result: { user: lists[0].dataValues } })
                    } else {
                        res.json({ code: 417, message: '密码不正确！', result: null })
                    }
                })
            }

        })();


    },
    userLogout(req, res) {
        return res.send('userLogout')
    },
    userList(req, res) {
        (async() => {
            var page = parseInt(req.query.page)
            var count = parseInt(req.query.count)
            var total = await model.user.count();
            await model.user.findAll({
                    // where: '', //为空，获取全部，也可以自己添加条件
                    offset: (page - 1) * count, //开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
                    limit: count //每页限制返回的数据条数
                }).then((response) => {
                    res.json({ code: 200, message: '查询成功', result: response, totalCount: total })
                }).catch((err) => {
                    // res.end(err);
                })
                // res.json({ code: 200, message: '查询成功', result: lists, totalCount: total })
        })()

    },
    userRegister(req, res) {
        (async() => {
            var userName = req.body.userName;
            var password = req.body.password;
            var time = Date.parse(new Date()) / 1000;

            if (!userName) {
                return res.send({ code: 417, message: '用户名必须填！', result: null })
            }

            if (!password) {
                return res.send({ code: 417, message: '密码必须填！', result: null })
            }

            var lists = await model.user.findAll();

            lists.map((item) => {
                if (item.dataValues.userName == userName) {
                    res.json({ code: 417, message: '名字已存在!', result: null });
                    return
                }

            })

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) console.log(err)
                password = hash;

                model.user.create({
                    userName: userName,
                    password: password,
                    createTime: time,
                    updateTime: time
                }).then(function(p) {
                    res.json({ code: 200, message: '注册成功！' })
                }).catch(function(err) {
                    console.log('failed: ' + err);
                })
            })
        })();
    }
}