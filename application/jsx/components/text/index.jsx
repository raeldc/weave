module.exports = {
    name            : 'text',
    group           : 'content',
    title           : 'Text',
    description     : 'A paragraph of text',
    iconClass       : 'glyphicon glyphicon-align-left',
    reactClass      : require('../node/component.js'),
    defaults: {
        element: 'p',
        text   : 'Double click here to edit'
    },
    configurables: {
        resize: false,
        text: true,
    }
}