function config(name) {
    return require('./grunts/' + name + '.js');
}

module.exports = function(grunt) {
    grunt.initConfig({
        concat        : config('concat'),
        // jshint        : config('jshint'),
        uglify        : config('uglify'),
        less          : config('less'),
        // cssmin        : config('cssmin'),
        copy          : config('copy'),
        watch         : config('watch'),
        react         : config('react')
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('dist', ['less', 'react', 'concat', 'copy', 'uglify']);
    grunt.registerTask('default', ['watch']);
};