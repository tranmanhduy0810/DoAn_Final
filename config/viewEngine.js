const path = require('path')
const express = require('express') //commonjs

const configViewEngine = (app) => {
    // console.log('>>check location src', path.join('./src', 'views'));
    app.set('views', path.join('./','./views/'));
    app.set('view engine', 'ejs');
    //config static files: images/css/js
    app.use(express.static(path.join('./', 'public')))
}
module.exports = configViewEngine;