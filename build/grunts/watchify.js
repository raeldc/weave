module.exports = {
    options: {
        debug: true
    },
    pagebuilder: {
        src : './code/core/pagebuilder.js',
        dest: 'public/js/pagebuilder.js'
    },
    themebuilder: {
        src : './code/core/themebuilder.js',
        dest: 'public/js/themebuilder.js'
    },
    desktop: {
        src : './code/desktop/js/app/index.js',
        dest: './code/desktop/js/app.js'
    },
}