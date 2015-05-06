var PreviewActions = require('core/actions/layout.js'),
    Config        = require('core/stores/uiconfig.js'),
    ButtonGroup   = require('react-bootstrap').ButtonGroup,
    Button        = require('react-bootstrap').Button;  

module.exports = React.createClass({
    getInitialState: function() {
        return Config.Preview.toObject();
    },

    render: function() {
        return  (
            <ButtonGroup>
                <Button className="btn-xs" active={this.state.device === 'desktop'} onClick={this.setDevice.bind(this, 'desktop')}><i className="fa fa-desktop"></i></Button>
                <Button className="btn-xs" active={this.state.device === 'laptop'} onClick={this.setDevice.bind(this, 'laptop')}><i className="fa fa-laptop"></i></Button>
                <Button className="btn-xs" active={this.state.device === 'tablet'} onClick={this.setDevice.bind(this, 'tablet')}><i className="fa fa-tablet"></i></Button>
                <Button className="btn-xs" active={this.state.device === 'phone'} onClick={this.setDevice.bind(this, 'phone')}><i className="fa fa-mobile"></i></Button>
            </ButtonGroup>
        );
    },

    setDevice: function(device) {
        PreviewActions.setDevice(device);
    },

    onDeviceChange: function(node){
        this.setState(this.getInitialState());
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // Update only when the selected node is different from the previous one
        return this.state.device !== nextState.device;
    },

    componentDidMount: function() {
        this.stopListeningToDeviceChange = Config.Preview.listen(this.onDeviceChange);
    },

    componentWillUnmount: function() {
        this.stopListeningToDeviceChange();
    }
});