module.exports = {
    dev: {
        files: {
            "public/css/ui.css"     : "public/css/less/ui.less",
            "public/css/overlay.css": "public/css/less/overlay.less",
            "public/css/base.css"   : "public/css/less/base.less",
        }
    },
    themebuilder: {
        files: {
            "public/css/themebuilder.css": "public/css/less/themebuilder.less",
            "public/css/overlay.css"     : "public/css/less/overlay.less",
            "public/css/base.css"        : "public/css/less/base.less",
        }
    },
    desktop: {
        options: {
            paths: [
                "public/css"
            ],
        },
        files: {
            "code/desktop/css/desktop.css": "code/desktop/css/desktop.less",
        }
    }
};
