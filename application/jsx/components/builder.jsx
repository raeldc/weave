var Factory  = require('application/components/factory.js');
var Nodes    = require('application/stores/nodes.js');
var CONST    = _.extend(require('application/constants/nodes.js'), require('application/constants/ui.js'));

module.exports = React.createClass({
    getInitialState: function(){
        return {

        };
    },

    render: function(){
        return (
            <div id="alchemy-body">
                {Factory.createNode('root')}
            </div>
        );
    },

    componentDidMount: function() {
        
    },
    componentWillUnmount: function() {
        
    }
});