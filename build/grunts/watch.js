module.exports = {
    options: {
        livereload: true
    },

    wp_pagebuilder: {
        files: [
            'public/js/pagebuilder.js',
            'public/css/less/**/*.less',
        ],
        tasks: ['less', 'copy:wp_pagebuilder_watch']
    }
}