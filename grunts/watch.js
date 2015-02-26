module.exports = {
    files: [
        'public/css/less/**/*.less',
        'application/components/**/*.jsx',
        'application/app.js'
    ],
    tasks: ['less', 'react', 'concat', 'copy', 'uglify']
}