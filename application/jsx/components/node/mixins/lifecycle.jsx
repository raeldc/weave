var Factory    = require('application/components/factory.js');
var UIEditMode = require('application/ui/controls/overlay.js');
var Nodes      = require('application/stores/nodes.js');
var DOM        = require('application/stores/dom.js');
var CONST      = require('application/constants/dom.js');

module.exports = {
    getInitialState: function() {
        var state = _.extend(Nodes.get(this.props.id));

        state.contentEditable = false;
        
        return state;
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

            // Temporary, add the class ui-editmode classname on this.property.className
            $node.addClass('ui-editmode');

            Nodes.addChangeListener(this.props.id, this.onChange);
            DOM.insert(this.props.id, node);
        }
    },

    componentWillUnmount: function() { 
        if(this.props.editMode) {
            Nodes.removeChangeListener(this.props.id, this.onChange);
            DOM.remove(this.props.id);
        }
    },

    onChange: function() {
        _.extend(this.state, Nodes.get(this.props.id));
        this.forceUpdate();
    },

    onQuickEdit: function() {
        this.setState({
            contentEditable: true
        });
    },

    onQuickEditOff: function() {
        this.setState({
            contentEditable: false
        });
    },

    getChildren: function() {
        this.children = Factory.createChildNodes(this.state.children) || this.state.text || [];

        if(_.isString(this.children)) {
            var html = {
                __html: this.children
            };

            this.children = [
                <span key="content" dangerouslySetInnerHTML={html} />
            ];
        }else if(this.props.editMode){
            this.children.push(<UIEditMode.DropArea key={"drop-area-inside-" + this.props.id} position="inside" node={this.props.id} />);
        }

        if(this.props.editMode) {
            this.children.unshift(<UIEditMode.Controls key="controls" node={this.props.id} />);
            this.children.unshift(<UIEditMode.HoverOverlay  key="overlay"  node={this.props.id} />);
            this.children.unshift(<UIEditMode.MarginBox key="magin-box" children={this.state.children} />);
            this.children.unshift(<UIEditMode.PaddingBox key="padding-box" node={this.props.id} />);
        }

        return this.children;
    }
}