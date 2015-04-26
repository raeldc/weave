var Nodes   = require('core/stores/nodes.js'),
    Devices = require('core/ui/controls/topbar/devices.js'),
    Toolbar = require('core/ui/controls/topbar/toolbar.js');

module.exports = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-collapse ui-controls-topbar">
                <ul className="nav navbar-nav ui-controls-topbar-panels">
                    <li><button className="btn btn-primary btn-xs">Layouts <i className="fa fa-angle-double-right"></i></button></li>
                </ul>
                <ul className="nav navbar-nav navbar-right ui-controls-topbar-toolbar">
                    <li><button className="btn btn-primary btn-xs">Insert Components <i className="fa fa-angle-double-down"></i></button></li>
                    <li><Devices /></li>
                    <li><Toolbar /></li>
                </ul>
            </nav>
        );
    },
});