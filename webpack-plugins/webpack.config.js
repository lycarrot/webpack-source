
const Plugin =require('./plugins')
const path=require('path')
module.exports ={
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist')
    },
    plugins:[
       new  Plugin({
        filename: 'offline'
       })
    ],
    mode:"development"
}