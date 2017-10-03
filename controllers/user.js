let moment = require('moment');
let model = require('../lib/model.js')
let bcrypt = require('bcryptjs');


module.exports = {
		userLogin(req,res){
				(async () => {
				    var userName =req.body.userName;
					var password = req.body.password;
					var lists = await model.user.findAll({where:{userName:userName}});

					if(!lists.length){
						res.send({code:417,message:'用户名不存在'})
					}else{
						console.log(lists[0].dataValues.password);
						bcrypt.compare(password,lists[0].dataValues.password,(err,sure) => {
							if(sure){
								delete lists[0].dataValues.password
								res.json({code:200,message:'登录成功',user:lists[0].dataValues})
							}else{
								res.json({code:417,message:'密码不正确！'})
							}
						})
					}

				})();
			
				
		},
		userLogout(){
			return res.send('userLogout')
		},
		userRegister(req,res){
			(async () => {
				    var userName =req.body.userName;
					var password = req.body.password;
					var time = Date.parse(new Date())/1000

					var lists = await model.user.findAll();

					lists.map((item) => {
						if(item.dataValues.userName == userName){
							res.json({code:417,message:'名字已存在!'});
							return 
						}
						
					})

					bcrypt.hash(password,10,(err,hash) => {
						if(err) console.log(err)
						password = hash;

						model.user.create({
						    userName: userName,
						    password:password,
						    createTime:time,
						    updateTime:time
						}).then(function (p) {
						    res.json({code:200,message:'注册成功！'})
						}).catch(function (err) {
						    console.log('failed: ' + err);
						})
					})
				})();
		}
}