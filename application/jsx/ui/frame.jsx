module.exports = React.createClass({
    displayName: 'Frame',
    propTypes  : {
        style: React.PropTypes.object,
        head :  React.PropTypes.node
    },

    render: function() {
        return React.createElement('iframe', {
            id   : this.props.id,
            style: this.props.style,
            head : this.props.head
        });
    },

    renderFrameContents: function() {
        var doc = React.findDOMNode(this).contentDocument;
        if(doc && doc.readyState === 'complete') {
            var contents = React.createElement('div',
                undefined,
                this.props.head,
                this.props.children
            );

            React.render(contents, doc.body);
        } else {
            setTimeout(this.renderFrameContents, 0);
        }
    },

    componentDidMount: function() {
        this.renderFrameContents();
    },

    componentWillUnmount: function() {
        React.unmountComponentAtNode(React.findDOMNode(this).contentDocument.body);
    },

    shouldComponentUpdate: function() {
        // We are sure that we don't need to rerender this, so never update;
        return false;
    }
});
