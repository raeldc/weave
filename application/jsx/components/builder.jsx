var Factory  = require('application/components/factory.js');
var Nodes    = require('application/stores/nodes.js');
var DOM      = require('application/stores/dom.js');
var UIConfig = require('application/stores/uiconfig.js');
var CONST    = require('application/constants/all.js');

module.exports = React.createClass({
    getInitialState: function(){
        return UIConfig.getConfig();
    },

    render: function(){
        return (
            <div id="alchemy-body">
                {Factory.createNode('root')}
            </div>
        );
    }
});