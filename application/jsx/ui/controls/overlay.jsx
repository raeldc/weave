var Factory         = require('application/components/factory.js');
var UIConfig        = require('application/stores/uiconfig.js');
var Nodes           = require('application/stores/nodes.js');
var LifeCycleMixin  = require('application/components/node/mixins/lifecycle.js');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var OverlayActions  = require('application/ui/actions/overlay.js');
var CONST           = require('application/constants/all.js');
var cx              = require('react/lib/cx');

var Controls = React.createClass({
    mixins: [PureRenderMixin],

    render: function(){
        var selectedClassName = this.props.selectedClassName || '';

        return (
            <div className={"controls" + selectedClassName}>
                <span className="fa fa-arrows grab"></span>
                <span className="resize-width"></span>
                <span className="resize-height"></span>
            </div>
        );
    }
});

var Overlay = React.createClass({
    mixins: [PureRenderMixin],

    render: function(){
        return (
            <div className="overlay" onMouseDown={this.onMouseDown} />
        );
    },

    onMouseDown: function(event) {
        OverlayActions.selectNode(this.props.node);
        event.stopPropagation();
    },
});

module.exports = React.createClass({
    mixins: [LifeCycleMixin],

    render: function() {
        var className         = this.state.className || '';
        var selectedClassName = this.state.selectedClassName || '';

        return (
            <div style={this.state.style} className={'ui-control-overlay ' + className} id={this.props.id}>
                <Controls selectedClassName={selectedClassName} key="controls" />
                <Overlay key="overlay" node={this.props.id}/>
                {this.props.children}
            </div>
        );
    },

    onSelectNode: function(node){
        if(node === this.props.id) {
            this.setState({
                selectedClassName: ' selected'
            });
        }
    },

    onUnSelectNode: function(node){
        this.setState({
            selectedClassName: ''
        });
    },

    componentDidMount: function(){
        UIConfig.on(CONST.NODE_SELECTED + '_' + this.props.id, this.onSelectNode);
        UIConfig.on(CONST.NODE_UNSELECTED + '_' + this.props.id, this.onUnSelectNode);
    },

    componentWillUnmount: function(){
        UIConfig.removeListener(CONST.NODE_SELECTED + '_' + this.props.id, this.onSelectNode);
        UIConfig.removeListener(CONST.NODE_UNSELECTED + '_' + this.props.id, this.onUnSelectNode);
    }
});
