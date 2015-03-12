module.exports = {
    name            : 'container',
    group           : 'layout',
    title           : 'Container',
    description     : 'HTML5 Elements div, section, header, footer, article, aside, nav, details, summary',
    iconClass       : 'glyphicon glyphicon-unchecked',
    reactClass      : require('../node/component.js'),
    reactConfigClass: require('../node/configuration'),
    defaults: {
        element: 'div',
        text   : 'Container'
    },
    configurables: {
        resize: true,
        text: false,
    }
}