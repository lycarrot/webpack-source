const webpack=require('webpack')
const path=require('path');
const glob=require('glob');

const pwd=process.cwd()

function getEntry(){
    const entryFiles = glob.sync(path.join(pwd, './src/*/index.js'));
    console.log('files',entryFiles,path.join(pwd, './src/*/index.js'))
    // Object.
}
getEntry()
const baseConfig= {
    entry:'./',
    output:{
        filename:'[name]_[chunkhash:8].js',
        path:path.join(pwd,'dist')
    }
}

webpack(baseConfig)