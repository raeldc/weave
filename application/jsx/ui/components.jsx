var NodeActions = require('application/components/node/actions.js');

module.exports = React.createClass({
    mixins: [NodeActions],

    render: function() {
        return <button>Hello World!</button>;
    },
});