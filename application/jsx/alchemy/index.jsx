var UI       = require('application/ui');
var Builder  = require('application/ui/builder.js');
var UIConfig = require('application/stores/uiconfig.js');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
                <UI ref="ui"/>
                <Builder ref="builder" />
            </div>
        );
    }
});