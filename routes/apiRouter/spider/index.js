
/**
 * @name 爬虫路由
 * 
 */
import consturPart from '../../../constructor/c_spider/index'
var express = require('express');
var router = express.Router();
// 查询兼职
router.get('/baiduNews', consturPart.getBaiduNews);

module.exports = router