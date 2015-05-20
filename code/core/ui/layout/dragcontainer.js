'use strict'

import Component     from 'core/component.js'
import Factory       from 'core/components/node/factory.js'
import Nodes         from 'core/stores/nodes.js'
import LayoutStore   from 'core/stores/layout.js'
import LayoutActions from 'core/actions/layout.js'

export default class DragContainer extends Component {
    constructor(props, context) {
        super(props, context)

        this.properties = {}
    }

    initialState(props) {
        return {
            hidden: true
        }
    }

    beforeMount() {
        this.stopListeningToStartDrag = LayoutActions.startDrag.listen(this.grabNode)
        this.stopListeningToStopDrag  = LayoutActions.stopDrag.listen(this.hideContainer)
    }

    beforeUnmout() {
        this.stopListeningToStartDrag()
        this.stopListeningToStopDrag()
    }

    render() {
        let classes = ['drag-container']

        if(this.state.hidden) {
            classes.push('hidden')
        }

        return React.createElement('div', _.extend(this.properties, {
            ref      : 'container',
            className: classes.join(' ')
        }))
    }

    followCursor(event) {
        if(this.properties.style) {
            var x = this.previousX - this.properties.style.left
            var y = this.previousY - this.properties.style.top

            this.properties.style.left = event.clientX - x
            this.properties.style.top  = event.clientY - y

            this.previousX = event.clientX
            this.previousY = event.clientY

            this.forceUpdate()
        }
    }

    hideContainer() {
        this.previousX = undefined
        this.previousY = undefined

        jQuery(document).unbind('mousemove.dragcontainer')
        React.unmountComponentAtNode(React.findDOMNode(this.refs.container))

        // Hide the container
        this.state.hidden = true
        this.forceUpdate()
    }

    grabNode(node, instance, event) {
        var info, container

        if(instance) {
            container = React.findDOMNode(this.refs.container)
            info      = this.getNodeInfo(instance)

            // Make a clone of the node inside the container
            React.render(Factory.createNode(node, {type: 'layout'}), container)

            // Record the current clientX and clientY
            this.previousX = event.clientX
            this.previousY = event.clientY

            // Register the mousemove event on the document
            jQuery(document).on('mousemove.dragcontainer', this.followCursor)

            // Adapt the size and coordinates of the container to the drag_subject
            this.properties.style = info


            // Show the container
            this.state.hidden = false
            this.forceUpdate()
        }
    }

    getNodeInfo(instance) {
        var $target    = jQuery(React.findDOMNode(instance)),
            nodeOffset = $target.offset()

        return {
            width : $target.outerWidth(),
            height: $target.outerHeight(),
            top   : nodeOffset.top - jQuery(window).scrollTop(),
            left  : nodeOffset.left
        }
    }
}