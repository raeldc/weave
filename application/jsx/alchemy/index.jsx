var UI       = require('application/ui');
var Canvas  = require('application/ui/canvas.js');
var UIConfig = require('application/stores/uiconfig.js');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
                <UI ref="ui"/>
                <Canvas ref="canvas" />
            </div>
        );
    }
});