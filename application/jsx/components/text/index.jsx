module.exports = {
    name            : 'text',
    group           : 'content',
    title           : 'Text',
    description     : 'A paragraph of text',
    iconClass       : 'fa fa-align-left',
    reactClass      : require('../node/component.js'),
    reactConfigClass: require('../node/configuration'),
    defaults: {
        element: 'p',
        text   : 'Double click here to edit'
    }
}