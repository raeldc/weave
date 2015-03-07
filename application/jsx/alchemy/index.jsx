var UI      = require('application/ui');
var Builder = require('application/ui/builder.js');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
                <UI />
                <Builder/>
            </div>
        );
    }
});