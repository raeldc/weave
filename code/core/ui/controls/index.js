var TopBar     = require('core/ui/controls/topbar'),
    Components = require('core/ui/controls/components');

var Controls = React.createClass({
    render: function() {
        return (
            <div id="corebuilder-controls" className="container-fluid">
                <TopBar />
                <div className="row">
                    <div className="col-lg-12">
                        <Components />
                        <div id="corebuilder-layout" />
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = Controls;