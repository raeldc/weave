var LifeCycleMixin = require('core/components/node/mixins/layout/lifecycle.js'),
    EventsMixin    = require('core/components/node/mixins/layout/events.js'),
    EditModeMixin  = require('core/components/node/mixins/layout/editmode.js'),
    UIEventsMixin  = require('core/components/node/mixins/layout/uievents.js');

module.exports = React.createClass({
    mixins: [LifeCycleMixin],

    render: function() {
        if(_.isEmpty(this.props.children)) {
            return this.renderEmpty();
        }
        else return this.renderNode();
    },

    renderNode: function() {
        return (
            <div className="column">
                {this.props.children}
            </div>
        );
    },

    renderEmpty: function() {
        return (
            <div className="column">
                <h3>Add a Content</h3>
            </div>
        );
    }
});