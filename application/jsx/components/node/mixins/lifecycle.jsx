var Factory    = require('application/components/factory.js');
var UIEditMode = require('application/ui/controls/overlay.js');
var Nodes      = require('application/stores/nodes.js');
var DOM        = require('application/stores/dom.js');
var CONST      = require('application/constants/dom.js');

module.exports = {
    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    componentWillMount: function() {
        this.getChildren();
    },

    componentWillUpdate: function() {
        this.getChildren();
    },

    componentDidMount: function() {
        if(this.props.editMode) {
            var node  = this.getDOMNode();
            var $node = jQuery(node);

            // Temporary
            $node.addClass('ui-editmode');

            Nodes.addChangeListener(this.props.id, this.onChange);
            DOM.insert(this.props.id, node);
        }
    },

    componentWillUnmount: function() { 
        if(this.props.editMode) {
            Nodes.removeChangeListener(this.props.id, this.onChange);
            DOM.remove(this.props.id);
            $node.removeClass('ui-control-overlay');
        }
    },

    onChange: function() {
        this.setState(Nodes.get(this.props.id));
    },

    getChildren: function() {
        this.children = Factory.createChildNodes(this.state.children) || this.state.text || null;

        if(this.props.editMode) {
            if(_.isString(this.children)) {
                var html = {
                    __html: this.children
                };

                this.children = [
                    <span dangerouslySetInnerHTML={html} key="content" />
                ];
            }

            this.children.unshift(<UIEditMode.Controls key="controls" node={this.props.id} />);
            this.children.unshift(<UIEditMode.Overlay  key="overlay"  node={this.props.id} />);
        }

        return this.children;
    }
}