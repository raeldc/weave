var Factory  = require('application/components/factory.js');
var Nodes    = require('application/stores/nodes.js');
var DOM      = require('application/stores/dom.js');
var UIConfig = require('application/stores/uiconfig.js');
var CONST    = require('application/constants/all.js');
var Frame    = require('application/ui/frame.js');

module.exports = React.createClass({
    displayName: 'Canvas',

    getInitialState: function(){
        return UIConfig.getConfig();
    },

    render: function(){
        return (
            <div id="alchemy-canvas" className={this.state.device}>
                <Frame 
                    head={<link type='text/css' rel='stylesheet' href='css/style.css' />}
                >
                {Factory.createNode('root')}
                </Frame>
            </div>
        );
    },

    componentDidUpdate: function() {
        UIConfig.emit(CONST.UI_DEVICE_CHANGED, this.state.device);
    },

    componentDidMount: function() {
        UIConfig.on(CONST.UI_ACTION_SET_DEVICE, this.configChanged);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.UI_ACTION_SET_DEVICE, this.configChanged);
    },

    configChanged: function(){
        this.setState(this.getInitialState());
    }
});