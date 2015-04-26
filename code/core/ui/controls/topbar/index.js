var Nodes   = require('core/stores/nodes.js'),
    Devices = require('core/ui/controls/topbar/devices.js');

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
                    <li><button className="btn btn-info btn-xs">Back to Admin</button></li>
                    <li><button className="btn btn-success btn-xs" onClick={this.save}>Save</button></li>
                </ul>
            </nav>
        );
    },

    save: function(event) {
        jQuery.post(Config.Canvas.get('page'), {nodes: Nodes.toObject()}, function(result){

        });
    }
});