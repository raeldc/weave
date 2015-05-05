var Factory = require('core/components/node/factory.js');

module.exports = React.createClass({
    render: function() {
        return Factory.createNode('root', 'layout');
    }
});