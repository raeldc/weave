module.exports = {
    files: [
        'code/core/**/*.js',
        'public/css/less/**/*.less',
    ],
    tasks: ['less', 'watchify', 'copy']
}