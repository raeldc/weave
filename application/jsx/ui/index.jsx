var Dispatcher = require('application/alchemy/dispatcher.js');
var CONST      = require('application/constants/nodes.js');

var UI = React.createClass({
    render: function() {
        return <button>Hello World!</button>;
    },
});

Dispatcher.register(function(command) {
    
});

module.exports = UI;