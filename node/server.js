var cors = require("cors");
var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
	buildSchema
} = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
	hello: () => 'Hello world!'
};

var app = express();
//设置跨域请求头
// app.all('*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*"); //项目上线后改成页面的地址
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// 	if (req.method == 'OPTIONS') {
//     res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
//  }else {
//     next();
//  }
// });
app.use('/graphql',cors({credentials: true, origin: 'http://localhost:8848'}), graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
// 传入参数
// {
//   hello
// }
