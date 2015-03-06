var Dispatcher = require('application/alchemy/dispatcher.js');
var UIConfig   = require('application/stores/uiconfig.js');
var CONST      = require('application/constants/ui.js');

var UI = React.createClass({
    getInitialState: function(){
        return UIConfig.getConfig();
    },

    render: function() {
        return (
            <div id="alchemy-ui">
                <button onClick={this.toggleQuickEditMode}>Quick Edit Mode: {this.state.quick_edit_on ? 'On' : 'Off'}</button>
                <button onClick={this.toggleLayoutEditMode}>Layout Edit Mode: {this.state.layout_edit_on ? 'On' : 'Off'}</button>
            </div>
        );
    },

    componentDidMount: function() {
        UIConfig.on(CONST.UI_CONFIG_CHANGED, this.onChange);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.UI_CONFIG_CHANGED, this.onChange);
    },

    onChange: function(){
        this.setState(UIConfig.getConfig());
    },

    toggleLayoutEditMode: function() {
        Dispatcher.dispatch({action: CONST.UI_TOGGLE_LAYOUT_EDIT_MODE});
    },

    toggleQuickEditMode: function() {
        Dispatcher.dispatch({action: CONST.UI_TOGGLE_QUICK_EDIT_MODE});
    }
});

module.exports = UI;