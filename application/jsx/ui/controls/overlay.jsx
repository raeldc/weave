var Dispatcher      = require('application/alchemy/dispatcher.js');
var Factory         = require('application/components/factory.js');
var UIActions       = require('application/ui/actions.js');
var Nodes           = require('application/stores/nodes.js');
var Components      = require('application/stores/components.js');
var DOM             = require('application/stores/dom.js');
var LifeCycleMixin  = require('application/components/node/mixins/lifecycle.js');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var CONST           = require('application/constants/all.js');

var Controls = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState: function() {
        return {
            isSelected: false,
            configurables: Components.get(Nodes.get(this.props.node).component).configurables || {}
        };
    },

    render: function(){
        var className = this.state.isSelected ? 'ui-controls selected' : 'ui-controls';
        var controls = [];

        if(this.state.configurables.resize) {
            controls.push(<span key="resize-width"  className="fa fa-long-arrow-left resize-width"></span>);
            controls.push(<span key="resize-height" className="fa fa-long-arrow-up resize-height"></span>)
        }

        return (
            <a className={className}>{controls}</a>
        );
    },

    componentDidMount: function(){
        UIActions.on(CONST.NODE_SELECTED, this.onSelectNode);
    },

    componentWillUnmount: function(){
        UIActions.removeListener(CONST.NODE_SELECTED, this.onSelectNode);
    },

    onSelectNode: function(node){
        if(node === this.props.node) {
            this.initiateResize();
            this.setState({
                isSelected: true
            });
        }else{
            this.onUnselectNode();
        }
    },

    onUnselectNode: function(){
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
                UIActions.changeWidth(node.id, event.rect.width);
            }

            if(event.edges.bottom){
                UIActions.changeHeight(node.id, event.rect.height);
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
        UIActions.selectNode(this.props.node);
    },

    componentDidMount: function() {
        UIActions.on(CONST.UI_COMPONENT_DRAG_START, this.disableOnDrag);
        UIActions.on(CONST.UI_COMPONENT_DRAG_END, this.enableAfterDrag);
    },

    componentWillUnmount: function() {
        UIActions.removeListener(CONST.UI_COMPONENT_DRAG_START, this.disableOnDrag);
        UIActions.removeListener(CONST.UI_COMPONENT_DRAG_END, this.enableAfterDrag);
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

var SelectNodeMixin = {
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

    showBox: function(node) {
        if(node !== undefined && (this.props.node === node || (this.props.type === 'margin' && this.props.children.indexOf(node) !== -1))) {
            this.isVisible = true;
            this.adjustBox(node);
        }else {
            this.hideBox();
        }
    },

    hideBox: function() {
        this.isVisible = false;
        this.setState(this.getInitialState());
    },

    adjustBox: function(node) {
        if(!this.isVisible) {
            return;
        }

        var node     = DOM.get(node);
        var $node    = jQuery(node);

        var state = {
            visibility: 'visible',
        };

        if(this.props.type === 'padding') {
            state.width  = $node.width();
            state.height = $node.height();
            state.top    = parseInt($node.css('padding-top'));
            state.left   = parseInt($node.css('padding-left'));
        } else {
            var position = $node.position();
            state.width  = $node.outerWidth(true);
            state.height = $node.outerHeight(true);
            state.top    = position.top;
            state.left   = position.left;
        }

        this.setState(state);
    },

    addSelectionListener: function() {
        UIActions.on(CONST.NODE_SELECTED, this.showBox);
        //Nodes.addChangeListener(this.props.node, this.adjustBox);
    },

    removeSelectionListener: function() {
        UIActions.removeListener(CONST.NODE_SELECTED, this.showBox);
        //Nodes.removeChangeListener(this.props.node, this.adjustBox);
    }
}

// This sits on the parent so that it stays under the node that it is connected to.
var MarginBox = React.createClass({
    mixins: [SelectNodeMixin],

    getDefaultProps: function() {
        return {
            type    : 'margin',
            children: []
        }
    },

    render: function(){
        return <a className="ui-margin-box" style={this.state} />
    }
});

var PaddingBox = React.createClass({
    mixins: [SelectNodeMixin],

    getDefaultProps: function() {
        return {
            type: 'padding',
        }
    },

    render: function(){
        return <a className="ui-padding-box" style={this.state} />
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
        UIActions.on(CONST.UI_COMPONENT_DRAG_START, this.showDropArea);
        UIActions.on(CONST.UI_COMPONENT_DRAG_END, this.hideDropArea);
    },

    componentWillUnmount: function() {
        UIActions.removeListener(CONST.UI_COMPONENT_DRAG_START, this.showDropArea);
        UIActions.removeListener(CONST.UI_COMPONENT_DRAG_END, this.hideDropArea);
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
        UIActions.insertComponentAsNode(component, this.props.node);
    }

});

module.exports = {
    Controls    : Controls,
    HoverOverlay: HoverOverlay,
    MarginBox   : MarginBox,
    PaddingBox  : PaddingBox,
    DropArea    : DropArea
}