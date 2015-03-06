var Factory = require('application/components/factory.js');

module.exports = React.createClass({
    render: function(){
        return <div id="alchemy-body">{Factory.createNode('root')}</div>;
    }
});