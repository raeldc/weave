var Nodes           = require('core/stores/nodes.js'),
    UINodeActions   = require('core/actions/node.js'),
    UICanvasActions = require('core/actions/canvas.js');

module.exports = React.createClass({
    render: function() {
        var value = this.getCurrentValue();
        return (
            <span 
                className={this.props.className} 
                contentEditable="true" 
                dangerouslySetInnerHTML={{__html:value}} 
                onBlur={this.saveInput} 
                onKeyDown={this.detectEnter} 
            />
        );
    },

    componentDidUpdate: function() {
        React.findDOMNode(this).innerHTML = this.getCurrentValue();
    },

    getCurrentValue: function() {
        return Nodes.getStore(this.props.node).get('css')[this.props.device][this.props.propertyName] || this.props.default;
    },

    saveInput: function(event) {
        var value = event.target.innerHTML;

        switch(this.props.filter.constructor) {
            case Array:
                if(this.props.filter.indexOf(value) === -1) {
                    value = this.getCurrentValue();
                }
            break;
            case RegExp:
                value = String(value).match(this.props.filter).join('');
            break;
        }

        UINodeActions.updateNodeCSS(this.props.node, this.props.device, this.props.propertyName, value);
        UICanvasActions.nodeTouched();

        event.preventDefault();
    },

    detectEnter: function(event) {
        if(event.keyCode === 13) {
            this.saveInput(event);
            event.preventDefault();
        }
    }
});