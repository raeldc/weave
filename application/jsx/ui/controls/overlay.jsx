var Dispatcher      = require('application/alchemy/dispatcher.js');
var Factory         = require('application/components/factory.js');
var UIConfig        = require('application/stores/uiconfig.js');
var Nodes           = require('application/stores/nodes.js');
var DOM             = require('application/stores/dom.js');
var LifeCycleMixin  = require('application/components/node/mixins/lifecycle.js');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var OverlayActions  = require('application/ui/actions/overlay.js');
var CONST           = require('application/constants/all.js');
var cx              = require('react/lib/cx');

var Controls = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState: function() {
        return {
            isSelected: false
        };
    },

    render: function(){
        var className = this.state.isSelected ? 'ui-controls selected' : 'ui-controls';

        return (
            <a className={className}>
                <span className="fa fa-long-arrow-left resize-width"></span>
                <span className="fa fa-long-arrow-up resize-height"></span>
            </a>
        );
    },

    componentDidMount: function(){
        UIConfig.on(CONST.NODE_SELECTED   + '_' + this.props.node, this.onSelectNode);
        UIConfig.on(CONST.NODE_UNSELECTED + '_' + this.props.node, this.onUnselectNode);
    },

    componentWillUnmount: function(){
        UIConfig.removeListener(CONST.NODE_SELECTED   + '_' + this.props.node, this.onSelectNode);
        UIConfig.removeListener(CONST.NODE_UNSELECTED + '_' + this.props.node, this.onUnselectNode);
    },

    onSelectNode: function(node){
        if(node === this.props.node) {
            this.initiateResize();
            this.setState({
                isSelected: true
            });
        }
    },

    onUnselectNode: function(node){
        this.disableResize();

        this.setState({
            isSelected: false
        });
    },

    initiateResize: function() {
        var node    = Nodes.get(this.props.node);
        var parent  = DOM.get(node.parent);
        var $node   = jQuery(DOM.get(node.id));
        var $parent = jQuery(parent);

        interact(React.findDOMNode(this))
        .resizable({
            edges   : { left: false, right: true, bottom: true, top: false },
            restrict: {
                restriction: parent,
                endOnly    : false
            }
        })
        .on('resizemove', function (event) {
            // update the element's style
            if(event.edges.right) {
                OverlayActions.changeWidth(node.id, event.rect.width);
            }

            if(event.edges.bottom){
                OverlayActions.changeHeight(node.id, event.rect.height);
            }
        });
    },

    disableResize: function() {
        interact(React.findDOMNode(this)).unset();
    }
});

var HoverOverlay = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState: function() {
        return {
            display: 'inline-block'
        };
    },

    render: function(){
        return (
            <a className="ui-overlay" onClick={this.selectNode} style={this.state} />
        );
    },

    selectNode: function(event) {
        OverlayActions.selectNode(this.props.node);
        event.stopPropagation();
    },

    componentDidMount: function() {
        UIConfig.on(CONST.UI_COMPONENT_DRAG_START, this.disableOnDrag);
        UIConfig.on(CONST.UI_COMPONENT_DRAG_END, this.enableAfterDrag);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.UI_COMPONENT_DRAG_START, this.disableOnDrag);
        UIConfig.removeListener(CONST.UI_COMPONENT_DRAG_END, this.enableAfterDrag);
    },

    disableOnDrag: function () {
        this.setState({
            display: 'none'
        });
    },

    enableAfterDrag: function() {
        this.setState(this.getInitialState());
    }
});

// This sits on the parent so that it stays under the node that it is connected to.
var MarginBox = React.createClass({
    getDefaultProps: function() {
        return {
            children: []
        }
    },

    getInitialState: function() {
        return {
            position  : 'absolute',
            visibility: 'hidden',
            top       : 0,
            left      : 0,
            width     : 0,
            height    : 0,
            margin    : 0,
            padding   : 0
        }
    },

    render: function(){
        return <a className="ui-margin-box" style={this.state} />
    },

    componentDidMount: function() {
        this.addSelectionListener();
    },

    componentWillUpdate: function() {
        this.removeSelectionListener();
        this.addSelectionListener();
    },

    componentWillUnmount: function() {
        this.removeSelectionListener();
    },

    addSelectionListener: function() {
        var self = this;
        _.each(this.props.children, function(child, index){
            UIConfig.on(CONST.NODE_SELECTED   + '_' + child, self.showBox);
            UIConfig.on(CONST.NODE_UNSELECTED + '_' + child, self.hideBox);
            Nodes.addChangeListener(child, self.adjustBox);
        });
    },

    removeSelectionListener: function() {
        var self = this;
        _.each(this.props.children, function(child, index){
            UIConfig.removeListener(CONST.NODE_SELECTED   + '_' + child, self.showBox);
            UIConfig.removeListener(CONST.NODE_UNSELECTED + '_' + child, self.hideBox);
            Nodes.removeChangeListener(child, self.adjustBox);
        });
    },

    showBox: function(node) {
        this.isVisible = true;
        this.adjustBox(node);
    },

    adjustBox: function(node, visible) {
        if(!this.isVisible) {
            return;
        }

        var child    = DOM.get(node);
        var $child   = jQuery(child);
        var position = $child.position();

        this.setState({
            visibility: 'visible',
            width : $child.outerWidth(true),
            height: $child.outerHeight(true),
            top   : position.top,
            left  : position.left
        });
    },

    hideBox: function(node) {
        this.isVisible = false;
        this.setState(this.getInitialState());
    },
});

var PaddingBox = React.createClass({
    getInitialState: function() {
        return {
            position  : 'absolute',
            visibility: 'hidden',
            top       : 0,
            left      : 0,
            width     : 0,
            height    : 0,
            margin    : 0,
            padding   : 0
        }
    },

    render: function(){
        return <a className="ui-padding-box" style={this.state} />
    },

    componentDidMount: function() {
        UIConfig.on(CONST.NODE_SELECTED   + '_' + this.props.node, this.showBox);
        UIConfig.on(CONST.NODE_UNSELECTED + '_' + this.props.node, this.hideBox);
        Nodes.addChangeListener(this.props.node, this.adjustBox);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.NODE_SELECTED   + '_' + this.props.node, this.showBox);
        UIConfig.removeListener(CONST.NODE_UNSELECTED + '_' + this.props.node, this.hideBox);
        Nodes.removeChangeListener(this.props.node, this.adjustBox);
    },

    showBox: function(node) {
        this.isVisible = true;
        this.adjustBox(node);
    },

    adjustBox: function(node) {
        if(!this.isVisible) {
            return;
        }

        var $node         = jQuery(DOM.get(node));
        var paddingLeft   = parseInt($node.css('padding-left'));
        var paddingRight  = parseInt($node.css('padding-right'));
        var paddingTop    = parseInt($node.css('padding-top'));
        var paddingBottom = parseInt($node.css('padding-bottom'));

        this.setState({
            visibility: 'visible',
            top       : paddingTop,
            left      : paddingLeft,
            width     : $node.width(),
            height    : $node.height()
        });
    },

    hideBox: function(node) {
        this.isVisible = false;
        this.setState(this.getInitialState());
    },
});

var DropArea = React.createClass({
    getInitialState: function() {
        return {
            display: 'none'
        }
    },

    render: function() {
        return <a className={"ui-drop-area" + " " + this.props.position} style={this.state} onDragOver={this.allowDrop} onDrop={this.onDrop}>Drop Here {this.props.position} {this.props.node}</a>
    },

    componentDidMount: function() {
        UIConfig.on(CONST.UI_COMPONENT_DRAG_START, this.showDropArea);
        UIConfig.on(CONST.UI_COMPONENT_DRAG_END, this.hideDropArea);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.UI_COMPONENT_DRAG_START, this.showDropArea);
        UIConfig.removeListener(CONST.UI_COMPONENT_DRAG_END, this.hideDropArea);
    },

    showDropArea: function(event, component) {
        this.setState({
            display: 'block'
        });
    },

    hideDropArea: function(event, component) {
        this.setState({
            display: 'none'
        });
    },

    allowDrop: function(event) {
        event.preventDefault();
    },

    onDrop: function(event) {
        var component = event.dataTransfer.getData('component');
        OverlayActions.insertComponentAsNode(component, this.props.node);
    }

});

module.exports = {
    Controls    : Controls,
    HoverOverlay: HoverOverlay,
    MarginBox   : MarginBox,
    PaddingBox  : PaddingBox,
    DropArea    : DropArea
}