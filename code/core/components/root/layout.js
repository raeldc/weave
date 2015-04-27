var LifeCycleMixin = require('core/components/node/mixins/layout/lifecycle.js');

module.exports = React.createClass({
    mixins: [LifeCycleMixin],

    render: function() {
        return (
            <div className="root">
                {this.children}
            </div>
        );
    },
});