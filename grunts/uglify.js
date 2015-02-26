module.exports = {
    dist: {
        files: {
            'public/js/components.js': ['<%= concat.components.dest %>'],
            'public/js/app.js': ['application/app.js']
        }
    }
};
