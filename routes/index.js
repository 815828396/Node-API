const part = require('./apiRouter/part/part')
const user = require('./apiRouter/user/user')

const setRouter = app => {
	// 设置有关兼职模块的API路径
	app.use('/api/v1/part', part)
	// 设置user路由
	app.use('/api/v1/user', user)
}


module.exports = setRouter;
