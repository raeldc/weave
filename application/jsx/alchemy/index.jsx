var UI       = require('application/ui');
var Builder  = require('application/ui/builder.js');
var UIConfig = require('application/stores/uiconfig.js');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
                <UI ref="ui"/>
                <Builder ref="builder" />
            </div>
        );
    },

    componentDidMount: function(){
        this.adjustLayout();
        jQuery(window).resize(this.adjustLayout);
    },

    adjustLayout: function(){
        var $ui      = jQuery(this.refs.ui.getDOMNode());
        var $builder = jQuery(this.refs.builder.getDOMNode());

        $builder.height(jQuery(window).height() - $ui.height());
    }
});