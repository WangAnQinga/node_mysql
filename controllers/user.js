let moment = require('moment');
let model = require('../database/model.js')
let bcrypt = require('bcryptjs');


const userLogin = (req, res) => {
    (async() => {

        const { userName, password } = req.body

        if (!userName || !password) {
            return res.send({ code: 417, message: '用户信息必须填！', result: null })
        }


        await model.user.findOne({ where: { userName: userName } })
            .then((res) => {
                if (res) {
                    res.json({ code: 417, message: '用户名不存在' })
                } else {
                    bcrypt.compare(password, res.rows.password, (err, sure) => {
                        if (sure) {
                            delete res.rows.password
                            res.json({ code: 200, message: '登录成功', result: { user: res.rows } })
                        } else {
                            res.json({ code: 417, message: '密码不正确！', result: null })
                        }
                    })
                }
            }).catch((err) => {

            })

    })();


}
const userLogout = (req, res) => {
    return res.send('userLogout')
}
const userList = (req, res) => {
    (async() => {
        const { page, count } = res.query

        await model.user.findAndCount({
            // where: '', //为空，获取全部，也可以自己添加条件
            offset: (page - 1) * count, //开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
            limit: count //每页限制返回的数据条数
        }).then((response) => {
            res.json({ code: 200, message: '查询成功', result: response.rows, totalCount: response.count })
        }).catch((err) => {
            res.end(err)
        })



    })()

}
const userRegister = (req, res) => {
    (async() => {
        const { userName, password } = req.body;
        var time = Date.parse(new Date()) / 1000;

        if (!userName || !password) {
            res.send({ code: 417, message: '用户信息必须完整！', result: null })
        }

        await model.user.findOne({ where: { "userName": userName } }).then((item) => {
            if (item) {
                res.json({ code: 417, message: '用户名已存在！', result: null })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) console.log(err)
                    model.user.create({
                        userName: userName,
                        password: hash,
                        createTime: time,
                        updateTime: time
                    }).then((p) => {
                        res.json({ code: 200, message: '注册成功！' })
                    }).catch((err) => {
                        console.log('failed: ' + err);
                    })
                })
            }
        }).catch((err) => {
            res.end(err)
        })
    })();
}

module.exports = {
    userLogin,
    userLogout,
    userList,
    userRegister
}