var TopBar = require('core/ui/controls/topbar');

var Controls = React.createClass({
    render: function() {
        return (
            <div id="corebuilder-controls" className="container-fluid">
                <TopBar />
                <div className="row">
                    <div id="corebuilder-layout" className="col-lg-12"></div>
                </div>
            </div>
        );
    },
});

module.exports = Controls;