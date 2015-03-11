var Dispatcher     = require('application/alchemy/dispatcher.js');
var UIConfig       = require('application/stores/uiconfig.js');
var OverlayActions = require('application/ui/actions/overlay.js');
var Configuration  = require('application/ui/controls/configuration.js');
var CONST          = require('application/constants/all.js');

var Component = React.createClass({
    render: function() {
        return <button draggable type="button" className="btn btn-success" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}><i className="fa fa-plus"></i> Container</button>
    },

    onDragStart: function(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("node", 1);
        OverlayActions.unselectNode();

        UIConfig.emit(CONST.UI_COMPONENT_DRAG_START, event, 'node');
    },

    onDragEnd: function(event) {
        console.log('drag end');
        UIConfig.emit(CONST.UI_COMPONENT_DRAG_END, event, 'node');
        event.stopPropagation();
    },

    onDragOver: function(event) {
        console.log('drag over');
        event.preventDefault();
    },
});

var UI = React.createClass({
    getInitialState: function(){
        return UIConfig.getConfig();
    },

    render: function() {
        return (
            <div id="alchemy-ui">
                <div className="row">
                    <div className="col-md-8">
                        <h3>Components</h3>
                        <Component />
                    </div>
                    <div className="col-md-4">
                        <h3 onDragOver={this.onDragOver}>Configure Component</h3>
                        <Configuration />
                    </div>
                </div>
            </div>
        );
    },

    onChange: function(){
        this.setState(UIConfig.getConfig());
    },

    onDragOver: function() {
        console.log('drag over');
    },

    componentDidMount: function() {
        UIConfig.on(CONST.UI_CONFIG_CHANGED, this.onChange);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.UI_CONFIG_CHANGED, this.onChange);
    },

    toggleLayoutEditMode: function() {
        Dispatcher.dispatch({action: CONST.UI_TOGGLE_LAYOUT_EDIT_MODE});
    },

    toggleQuickEditMode: function() {
        Dispatcher.dispatch({action: CONST.UI_TOGGLE_QUICK_EDIT_MODE});
    }
});

module.exports = UI;