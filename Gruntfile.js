function config(name) {
    return require('./build/grunts/' + name + '.js');
}

module.exports = function(grunt) {
    grunt.initConfig({
        // jshint        : config('jshint'),
        // cssmin        : config('cssmin'),
        copy      : config('copy'),
        uglify    : config('uglify'),
        less      : config('less'),
        watch     : config('watch'),
        watchify  : config('watchify')
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-watchify');

    grunt.registerTask('dist', ['less', 'watchify', 'uglify', 'copy']);
    grunt.registerTask('default', ['watch']);
};