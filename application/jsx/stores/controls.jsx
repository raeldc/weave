var UIControlsActions = require('application/actions/controls.js'),
    Store             = require('application/stores');

module.exports = (new Store({active_section: 'components'})).setActions(UIControlsActions, {

});