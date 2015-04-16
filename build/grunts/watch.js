module.exports = {
    files: [
        'public/css/less/**/*.less',
        'code/core/**/*.jsx'
    ],
    tasks: ['less', 'react', 'browserify', 'copy']
}