var TopBar = require('core/ui/controls/topbar');

var Controls = React.createClass({
    render: function() {
        return (
            <div id="corebuilder-controls">
                <TopBar />
            </div>
        );
    },
});

module.exports = Controls;