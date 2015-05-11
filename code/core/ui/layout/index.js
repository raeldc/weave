var Factory       = require('core/components/node/factory.js'),
    DragContainer = require('core/ui/layout/dragcontainer.js');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <DragContainer />
                {Factory.createNode('root', 'layout')}
            </div>
        )
    }
});