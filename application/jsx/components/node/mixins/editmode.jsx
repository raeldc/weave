var Factory    = require('application/components/factory.js');
var UIEditMode = require('application/ui/controls/overlay.js');
var Nodes      = require('application/stores/nodes.js');
var DOM        = require('application/stores/dom.js');
var CONST      = require('application/constants/dom.js');

module.exports = {
    componentWillMount: function() {
        if(this.props.editMode) {
            this.addClass('ui-editmode');
            this.addUIBoxes();
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        if(this.props.editMode) {
            this.addClass('ui-editmode');
            this.addUIBoxes();

            if(this.isText() && nextState.enableEditable) {
                this.addClass('editable');
            }
        }
    },

    componentDidMount: function() {
        if(this.props.editMode) {
            Nodes.addChangeListener(this.props.id, this.renderChanges);
            DOM.insert(this.props.id, React.findDOMNode(this));
            DOM.emit(CONST.DOM_INSERTED + '_' + this.props.id, this.props.id);
        }
    },

    componentDidUpdate: function() {
        if(this.props.editMode) {
            DOM.emit(CONST.DOM_UPDATED + '_' + this.props.id, this.props.id);
        }
    },

    componentWillUnmount: function() { 
        if(this.props.editMode) {
            Nodes.removeChangeListener(this.props.id, this.renderChanges);
            DOM.remove(this.props.id);
            DOM.removeAllListeners(CONST.DOM_INSERTED + '_' + this.props.id);
            DOM.removeAllListeners(CONST.DOM_UPDATED + '_' + this.props.id);
        }
    },

    addUIBoxes: function() {
        if(_.isArray(this.children)) {
            this.children.unshift(<UIEditMode.OverlayBox key="overlay-box" self={this.props.id} children={this.state.children} />);
            this.children.unshift(<UIEditMode.MarginBox  key="magin-box"   self={this.props.id} children={this.state.children} />);
            this.children.unshift(<UIEditMode.PaddingBox key="padding-box" self={this.props.id} children={this.state.children} />);
            this.children.push(<UIEditMode.DropBox key={"drop-box" + this.props.id} position="inside" node={this.props.id} />);
        }
    },

    renderChanges: function() {
        _.extend(this.state, Nodes.get(this.props.id));
        this.forceUpdate();
    }
}