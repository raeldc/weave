module.exports = {
    dev: {
        options: {
            paths: ["bower_components/bootstrap/less"]
        },
        files: {
            "public/css/style.css" : "public/css/less/style.less",
            "public/css/canvas.css": "public/css/less/canvas.less",
            "public/css/base.css"  : "public/css/less/base.less",
        }
    }
};
