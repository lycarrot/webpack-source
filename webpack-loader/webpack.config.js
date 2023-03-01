
const path=require('path')


module.exports ={
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use:[
                    path.resolve('./loader/a'),
                    path.resolve('./loader/b'),
                    // path.resolve('./loader/raw-loader'),
                ]
            }
        ]
    },
    // plugins:[
    //    new  Plugin({
    //     filename: 'offline'
    //    })
    // ],
    mode:"development"
}