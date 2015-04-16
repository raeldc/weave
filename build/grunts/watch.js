module.exports = {
    options: {
        livereload: true
    },
    files: [
        'public/js/app.js',
        'public/css/less/**/*.less',
    ],
    tasks: ['less', 'copy']
}