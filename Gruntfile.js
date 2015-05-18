function config(name) {
    return require('./build/grunts/' + name + '.js');
}

module.exports = function(grunt) {
    grunt.initConfig({
        // jshint        : config('jshint'),
        // cssmin        : config('cssmin'),
        copy    : config('copy'),
        uglify  : config('uglify'),
        less    : config('less'),
        watch   : config('watch'),
        watchify: config('watchify'),
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-watchify');

    var wp_pagebuilder_watch = [
        'watchify:pagebuilder',
        'watch:wp_pagebuilder'
    ];

    var wp_themebuilder_watch = [
        'watchify:themebuilder',
        'watch:wp_themebuilder'
    ];

    var wp_pagebuilder_dist = [
        'less', 
        'watchify', 
        'uglify:pagebuilder',
        'copy:wp_pagebuilder_dist',
        // Copy files to the Standalone App also
        'copy:pagebuilder_dist',
    ];

    var wp_themebuilder_dist = [
        'less:themebuilder', 
        'watchify', 
        'uglify:themebuilder',
        'copy:wp_themebuilder_dist',
        // Copy files to the Standalone App also
        'copy:pagebuilder_dist',
    ];

    // Shortcuts
    grunt.registerTask('default',              wp_themebuilder_watch);
    grunt.registerTask('dist' ,                wp_themebuilder_dist);

    // Specifics
    grunt.registerTask('wp_pagebuilder_watch', wp_pagebuilder_watch);
    grunt.registerTask('wp_pagebuilder_dist' , wp_pagebuilder_dist);
};