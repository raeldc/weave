module.exports = {
    name       : 'text',
    group      : 'content',
    title      : 'Text',
    description: 'A paragraph of text',
    iconClass  : 'glyphicon glyphicon-align-left',
    node       : require('../node/node.js'),
    layout     : require('../node/layout.js'),
    paneview   : require('../node/paneview.js'),
    configurations: [
        require('../node/configuration/formatting.js'),
        require('../node/configuration/alignment.js'),
        require('../node/configuration/dimensions.js'),
        require('../node/configuration/box.js'),
        require('../node/configuration/styling.js'),
    ],
    configurables:  {

    },
    defaults: {
        element: 'p',
        text   : '[Text]'
    },
    rules: {
        parents: ['column']
    }
}