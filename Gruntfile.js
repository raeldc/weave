function config(name) {
    return require('./grunts/' + name + '.js');
}

module.exports = function(grunt) {
    grunt.initConfig({
        // jshint        : config('jshint'),
        // cssmin        : config('cssmin'),
        copy      : config('copy'),
        uglify    : config('uglify'),
        less      : config('less'),
        watch     : config('watch'),
        react     : config('react'),
        watchify: config('watchify')
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-watchify');

    grunt.registerTask('dist', ['less', 'react', 'watchify', 'uglify', 'copy']);
    grunt.registerTask('default', ['watch']);
};