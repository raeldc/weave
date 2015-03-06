var Dispatcher = require('application/alchemy/dispatcher.js');
var CONST      = require('application/constants/ui.js');

var UI = React.createClass({
    getInitialState: function(){
        return {
            layout_edit_on: false,
            quick_edit_on : false
        };
    },

    render: function() {
        return <div id="alchemy-ui">
                    <button onClick={this.toggleQuickEditMode}>Quick Edit Mode: {this.state.quick_edit_on ? 'On' : 'Off'}</button>
                    <button onClick={this.toggleLayoutEditMode}>Layout Edit Mode: {this.state.layout_edit_on ? 'On' : 'Off'}</button>
                </div>
    },

    toggleLayoutEditMode: function() {
        var layout_edit_on = !this.state.layout_edit_on;

        this.setState({
            layout_edit_on: layout_edit_on,
            quick_edit_on : false
        });

        Dispatcher.dispatch({
            command      : CONST.UI_TOGGLE_LAYOUT_EDIT_MODE,
            quick_edit_on: layout_edit_on
        });
    },

    toggleQuickEditMode: function() {
        var quick_edit_on = !this.state.quick_edit_on;

        this.setState({
            quick_edit_on : !this.state.quick_edit_on,
            layout_edit_on: false
        });

        Dispatcher.dispatch({
            action       : CONST.UI_TOGGLE_QUICK_EDIT_MODE,
            quick_edit_on: quick_edit_on
        });
    }
});

module.exports = UI;