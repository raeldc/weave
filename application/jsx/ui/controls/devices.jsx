var UIConfig    = require('application/stores/uiconfig.js');
var UIActions   = require('application/ui/actions.js');
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Button      = require('react-bootstrap').Button;
var CONST       = require('application/constants/all.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            device: UIConfig.getConfig('device')
        }
    },

    render: function() {
        return  (
            <ButtonGroup>
                <Button className="btn-xs" onClick={this.setDevice.bind(this, 'desktop')}>Full</Button>
                <Button className="btn-xs" onClick={this.setDevice.bind(this, 'laptop')}>Laptop</Button>
                <Button className="btn-xs" onClick={this.setDevice.bind(this, 'tablet')}>Tablet</Button>
                <Button className="btn-xs" onClick={this.setDevice.bind(this, 'phone')}>Phone</Button>
            </ButtonGroup>
        );
    },

    setDevice: function(device) {
        UIActions.setDevice(device);
    },

    updateDevice: function(){
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        UIConfig.on(CONST.UI_DEVICE_CHANGED, this.updateDevice);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.UI_DEVICE_CHANGED, this.updateDevice);
    }
});