var Dispatcher         = require('application/alchemy/dispatcher.js');
var ComponentSelection = require('application/ui/controls/components.js');
var UIConfig           = require('application/stores/uiconfig.js');
var OverlayActions     = require('application/ui/actions/overlay.js');
var Configuration      = require('application/ui/controls/configuration.js');
var CONST              = require('application/constants/all.js');

var UI = React.createClass({
    getInitialState: function(){
        return UIConfig.getConfig();
    },

    render: function() {
        return (
            <div id="alchemy-ui">
                <div className="row">
                    <div className="col-md-8">
                        <ComponentSelection />
                    </div>
                    <div className="col-md-4">
                        <h4 onDragOver={this.onDragOver}>Configure Component</h4>
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