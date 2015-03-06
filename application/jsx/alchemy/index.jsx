var Builder = require('application/components/builder.js');
var UI = require('application/ui');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
                <Builder/>
                <UI />
            </div>
        );
    }
});