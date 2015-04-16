module.exports = {
    dynamic_mappings: {
        files: [
            {
            expand: true,
                cwd: 'code/core',
                src: ['**/*.jsx'],
                dest: 'build/tmp/core',
                ext: '.js'
            }
        ]
    }
};
