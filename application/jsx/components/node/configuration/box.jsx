var Nodes           = require('application/stores/nodes.js'),
    Canvas          = require('application/stores/canvas.js'),
    UINodeActions   = require('application/actions/node.js'),
    UICanvasActions = require('application/actions/canvas.js');

var CssPropertyEditor = React.createClass({
    render: function() {
        var value = this.getCurrentValue();
        return <span className={this.props.className} contentEditable="true" dangerouslySetInnerHTML={{__html:value}} onBlur={this.saveInput} onKeyDown={this.detectEnter} />
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

module.exports = React.createClass({
    render: function() {
        return (
            <div className="form-inline">
                <h5>Box</h5>
                <div>
                    <CssPropertyEditor 
                        key="css-property-marginTop" 
                        node={this.props.node} 
                        default="0" 
                        device={this.props.device} 
                        filter={/\d+/i} 
                        propertyName="marginTop" 
                    />
                    <CssPropertyEditor 
                        key="css-property-marginTopUnit" 
                        node={this.props.node} 
                        default="px" 
                        device={this.props.device} 
                        filter={['em', 'ch', 'vw', 'vh', 'vmin', 'vmax', '%', 'px']}
                        propertyName="marginTopUnit" 
                    />
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        this.stopListeningToCSSChanges = Nodes.getStore(this.props.node).getStore('css').listen(this.renderChanges);
    },

    componentWillUnmount: function() {
        this.stopListeningToCSSChanges();
    },

    renderChanges: function() {
        this.forceUpdate();
    }
});