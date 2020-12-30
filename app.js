require('babel-core/register');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 
var webSocket = require('ws');
const ws = new webSocket.Server({ port: '3000' }, res => {
    console.log('已经开启 ws：port:3000 连接');
});
let clients = [];
let ips = [];
const nameIp = {
    26: {
        name: '群主大人',
        cl: 'blue'
    },
    30: {
        name: 'LE',
        cl: 'yellow'
    },
    38: {
        name: 'giao桑', // 李帅比
        cl: 'green'
    }
}
ws.on('connection',(client, req)=>{
    console.log("client:",req.connection.remoteAddress);
    const ip = req.connection.remoteAddress;
    const _lastIp = ip.slice(ip.lastIndexOf('.') + 1);
    if (ips.indexOf(ip) == -1) {
        ips.push(ip);
        clients.push(client);
    } else {
        clients[ips.indexOf(ip)] = client;
    }
    
    console.log('-----------------------');
    console.log('client 连接数：', ips.length, clients.length);
    console.log('------------------======');
    let response = { len: ips.length };
    // client.send({len: ips.length});
    // console.log("来自服务器的数据",msg);
    for (let i = 0; i < clients.length; i++) {
        console.log('ips:', ips);
        // client.send("欢迎光临");
        clients[i].send(JSON.stringify(response)); // 通过send方法来给前端发送消息
    }

    // 监听消息
    client.on('message', msg=>{
        const _msg = JSON.parse(msg);
        for (let i = 0; i < clients.length; i++) {
            response.content = `${ _msg.value }`;
            response.len = ips.length;
            response.cl = nameIp[_lastIp].cl;
            response.src = _msg.src;
            response.userName = nameIp[_lastIp].name || '一个没有名字的帅逼';
            clients[i].send(JSON.stringify(response)); // 通过send方法来给前端发送消息
        }
    })
    client.on('close',(msg)=>{
        // console.log("关闭服务器连接")
    })
})



// 引入路由配置文件
var setRouters = require('./routes/index')
// 配置拦截器
var Interceptor = require('./public/javascripts/intercetor/interceptor');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 请求路由拦截中间件
// interceptor(app);
new Interceptor(app)._init();
// 配置路由
setRouters(app);

module.exports = app;
