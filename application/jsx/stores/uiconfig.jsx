var EventEmitter = require('events').EventEmitter;
var Dispatcher   = require('application/alchemy/dispatcher.js');
var CONST        = require('application/constants/all.js');
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

// A lot of components could be listening to this store.
UIConfig.setMaxListeners(0);

UIConfig.dispatchToken = Dispatcher.register(function(command) {
    switch(command.action) {
        // UI Config Dispatcher Actions
    }
});

module.exports = UIConfig;