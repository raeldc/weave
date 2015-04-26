var TopBar = require('core/ui/controls/topbar'),
    Layout = require('core/ui/controls/layout');

var Controls = React.createClass({
    render: function() {
        return (
            <div id="corebuilder-controls" className="container-fluid">
                <TopBar />
                <div className="row">
                    <Layout />
                </div>
            </div>
        );
    },
});

module.exports = Controls;