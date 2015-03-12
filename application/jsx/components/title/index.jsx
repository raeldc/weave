module.exports = {
    name            : 'title',
    group           : 'content',
    title           : 'Header Title',
    description     : 'Header Title',
    iconClass       : 'glyphicon glyphicon-header',
    reactClass      : require('../node/component.js'),
    reactConfigClass: require('../node/configuration'),
    defaults: {
        element: 'h1',
        text   : 'Title (click here to edit)'
    },
    configurables: {
        resize: false,
        text: true,
    }
}