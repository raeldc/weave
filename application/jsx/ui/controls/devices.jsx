var UICanvasActions = require('application/ui/canvas/actions.js'),
    UIConfig        = require('application/stores/uiconfig.js'),
    ButtonGroup     = require('react-bootstrap').ButtonGroup,
    Button          = require('react-bootstrap').Button;  

module.exports = React.createClass({
    getInitialState: function() {
        return UIConfig.get('canvas');
    },

    render: function() {
        return  (
            <ButtonGroup className="ui-devices">
                <Button className="btn-xs" active={this.state.device === 'desktop'} onClick={this.setDevice.bind(this, 'desktop')}>Full</Button>
                <Button className="btn-xs" active={this.state.device === 'laptop'} onClick={this.setDevice.bind(this, 'laptop')}>Laptop</Button>
                <Button className="btn-xs" active={this.state.device === 'tablet'} onClick={this.setDevice.bind(this, 'tablet')}>Tablet</Button>
                <Button className="btn-xs" active={this.state.device === 'phone'} onClick={this.setDevice.bind(this, 'phone')}>Phone</Button>
            </ButtonGroup>
        );
    },

    setDevice: function(device) {
        UICanvasActions.setDevice(device);
    },

    onDeviceChange: function(node){
        this.setState(this.getInitialState());
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // Update only when the selected node is different from the previous one
        return this.state.device !== nextState.device;
    },

    componentDidMount: function() {
        this.stopListeningToDeviceChange = UIConfig.getStore('canvas').listen(this.onDeviceChange);
    },

    componentWillUnmount: function() {
        this.stopListeningToDeviceChange();
    }
});