var LayoutStore = require('core/stores/layout.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {device: LayoutStore.get('device')};
    },

    render: function() {
        var icon = this.state.device;

        switch(this.state.device) {
            case 'phone':
                icon = 'mobile'
            break;
        }

        return <i className={"fa fa-" + icon} />
    },

    componentDidMount: function() {
        this.stopListeningToDeviceChanges = LayoutStore.listen(this.updateIcon);
    },

    componentWillUnmount: function() {
        this.stopListeningToDeviceChanges();
    },

    updateIcon: function(device) {
        this.setState(this.getInitialState());
    }
})