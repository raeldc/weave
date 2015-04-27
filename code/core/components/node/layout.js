var LifeCycleMixin = require('core/components/node/mixins/layout/lifecycle.js'),
    EventsMixin    = require('core/components/node/mixins/layout/events.js'),
    EditModeMixin  = require('core/components/node/mixins/layout/editmode.js'),
    UIEventsMixin  = require('core/components/node/mixins/layout/uievents.js');

module.exports = React.createClass({
    mixins: [LifeCycleMixin],

    render: function() {
        return (
            <div className="content">
                {this.state.text || "Empty Text"}
            </div>
        );
    }
});