var UIControlsActions = require('core/actions/controls.js'),
    Store             = require('core/stores');

module.exports = (new Store({active_section: 'edit'})).setActions(UIControlsActions, {

});