/**
 * API 主路由配置文件
*/
const createError = require('http-errors');
const part = require('./apiRouter/part/part')
const user = require('./apiRouter/user/user')

const setRouter = app => {
	// 设置有关兼职模块的API路径
	app.use('/api/v1/part', part)
	// 设置user路由
	app.use('/api/v1/user', user)

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
	  next(createError(404));
	});
	// error handler
	app.use((err, req, res, next) => {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});
}


module.exports = setRouter;
