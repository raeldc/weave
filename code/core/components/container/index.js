module.exports = {
    name       : 'container',
    group      : 'layout',
    title      : 'Container',
    description: 'HTML5 Elements div, section, header, footer, article, aside, nav, details, summary',
    iconClass  : 'glyphicon glyphicon-unchecked',
    node       : require('../node/node.js'),
    defaults   : {
        element: 'div',
        text   : 'Container'
    }
}