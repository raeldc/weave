var Factory    = require('application/components/factory.js');
var UIEditMode = require('application/ui/controls/overlay.js');
var Nodes      = require('application/stores/nodes.js');
var DOM        = require('application/stores/dom.js');
var CONST      = require('application/constants/dom.js');

module.exports = {
    properties: {},

    getInitialState: function() {
        this.properties = Nodes.get(this.props.id);
        return {};
    },

    componentWillMount: function() {
        this.getChildren();
    },

    componentWillUpdate: function() {
        this.getChildren();
    },

    componentDidMount: function() {
        if(this.props.editMode) {
            var node  = React.findDOMNode(this);
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
            $node.removeClass('ui-editmode');
        }
    },

    onChange: function() {
        this.properties = Nodes.get(this.props.id);
        this.forceUpdate();
    },

    getChildren: function() {
        this.children = Factory.createChildNodes(this.properties.children) || this.properties.text || [];

        if(_.isString(this.children)) {
            var html = {
                __html: this.children
            };

            this.children = [
                <span key="content" dangerouslySetInnerHTML={html} />
            ];
        }

        if(this.props.editMode) {
            this.children.unshift(<UIEditMode.Controls key="controls" node={this.props.id} />);
            this.children.unshift(<UIEditMode.HoverOverlay  key="overlay"  node={this.props.id} />);
            this.children.unshift(<UIEditMode.MarginBox key="magin-box" children={this.properties.children} />);
            this.children.unshift(<UIEditMode.PaddingBox key="padding-box" node={this.props.id} />);
        }

        return this.children;
    }
}