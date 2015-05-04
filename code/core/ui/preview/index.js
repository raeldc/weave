var UIPreviewFactory = require('core/components/node/factory.js'),
    UIConfig         = require('core/stores/uiconfig.js'),
    LayoutActions    = require('core/actions/layout.js'),
    UIPreviewOverlay = require('core/ui/preview/overlay');

module.exports = React.createClass({
    displayName: 'Preview',

    getInitialState: function(){
        return UIConfig.Preview.toObject();
    },

    render: function(){
        return (
            <div id="corebuilder-preview-frame" className={this.state.device}>
                <iframe ref="iframe" src={this.state.page} onLoad={this.renderPreviewContent} />
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.device !== nextState.device;
    },

    componentDidMount: function() {
        window.preview = React.findDOMNode(this.refs.iframe).contentWindow;
        
        jQuery(window.preview).scroll(this.onFrameEvent);
        jQuery(window.preview).resize(this.onFrameEvent);

        this.stopListeningToPreviewChanges = UIConfig.Preview.listen(this.changePreview);
    },

    componentWillUnmount: function() {
        this.stopListeningToPreviewChanges();
        jQuery(window.preview).unbind('scroll');
        jQuery(window.preview).unbind('resize');
    },

    onFrameEvent: function(event) {
        LayoutActions.frameChanged(null, event);
        event.stopPropagation();
    },

    changePreview: function() {
        this.setState(this.getInitialState());
    },

    renderPreviewContent: function() {
        var doc = React.findDOMNode(this.refs.iframe).contentDocument;

        React.render(
            UIPreviewFactory.createNode('root', 'node'),
            doc.getElementById(this.state.container)
        );

        React.render(
            <div>
                <UIPreviewOverlay />
            </div>,
            doc.getElementById(this.state.overlay)
        )
    },
});