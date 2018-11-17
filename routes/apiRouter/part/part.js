
/**
 * @name 兼职模块
 * 
 */
import consturPart from '../../../constructor/c_part/constur_part.js'
var express = require('express');
var router = express.Router();
// 查询兼职
router.get('/selA', consturPart.getPart)
router.get('/add', consturPart.getPart)

module.exports = router