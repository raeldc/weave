var Nodes   = require('core/stores/nodes.js'),
    Devices = require('core/ui/controls/topbar/devices.js'),
    Toolbar = require('core/ui/controls/topbar/toolbar.js');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="row ui-controls-topbar">
                <div className="col-lg-3 ui-controls-topbar-panels">
                    <button className="btn btn-primary btn-xs">Layouts <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-primary btn-xs">Insert Components <i className="fa fa-angle-double-down"></i></button>
                </div>
                <div className="col-lg-2 col-lg-offset-2 ui-controls-topbar-devices">
                    <Devices />
                </div>
                <div className="col-lg-2 col-lg-offset-3 ui-controls-topbar-toolbar">
                    <Toolbar />
                </div>
            </div>
        );
    },
});