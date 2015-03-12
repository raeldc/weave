module.exports = {
    name            : 'title',
    group           : 'content',
    title           : 'Title',
    description     : 'Title',
    iconClass       : 'fa fa-header',
    reactClass      : require('../node/component.js'),
    reactConfigClass: require('../node/configuration'),
    defaults: {
        element: 'h1',
        text   : 'Title (click here to edit)'
    }
}