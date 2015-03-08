var EventEmitter = require('events').EventEmitter;
var Dispatcher   = require('application/alchemy/dispatcher.js');
var CONST        = require('application/constants/ui.js');
var _config      = {};

function setConfig(key, value) {
    if(_.isObject(key)) {
        _.extend(_config, key);
    }else if(_.isString(key)){
        _config[key] = value;
    }
}

var UIConfig = _.extend({
    initialize: function(data) {
        _config = data;
        return this;
    },

    getConfig: function(key) {
        // Clone so that _config remain private
        return key === undefined ? _.clone(_config): _config[key];
    }

}, EventEmitter.prototype);

UIConfig.dispatchToken = Dispatcher.register(function(command) {
    switch(command.action) {
        case CONST.UI_TOGGLE_QUICK_EDIT_MODE:
            setConfig({
                quick_edit_on: !UIConfig.getConfig('quick_edit_on'),
                layout_edit_on : false
            });

            UIConfig.emit(CONST.UI_TOGGLE_QUICK_EDIT_MODE);
            UIConfig.emit(CONST.UI_CONFIG_CHANGED);
        break;
        case CONST.UI_TOGGLE_LAYOUT_EDIT_MODE:
            setConfig({
                layout_edit_on: !UIConfig.getConfig('layout_edit_on'),
                quick_edit_on : false
            });

            UIConfig.emit(CONST.UI_TOGGLE_QUICK_EDIT_MODE);
            UIConfig.emit(CONST.UI_CONFIG_CHANGED);
        break;
    }
});

module.exports = UIConfig;