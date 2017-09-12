'use strict'

import Component     from 'core/component.js'
import Factory       from 'core/components/node/factory.js'
import Nodes         from 'core/stores/nodes.js'
import LayoutStore   from 'core/stores/layout.js'
import LayoutActions from 'core/actions/layout.js'

// Private "style" Object
const style = {
    width : 0,
    height: 0,
    top   : 0,
    left  : 0
}

export default class DragContainer extends Component {
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
        let classes = ['layout__drag-container']

        if(this.state.hidden) {
            classes.push('hidden')
        }

        return React.createElement('div', {
            ref      : 'container',
            className: classes.join(' '),
            style    : {
                width : style.width,
                height: style.height,
                top   : style.top,
                left  : style.left
            }
        })
    }

    followCursor(event) {
        let x = this.previousX - style.left
        let y = this.previousY - style.top

        style.left = event.clientX - x
        style.top  = event.clientY - y

        this.previousX = event.clientX
        this.previousY = event.clientY

        this.forceUpdate()
    }

    hideContainer() {
        this.previousX = undefined
        this.previousY = undefined

        jQuery(document).unbind('mousemove.dragcontainer')
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.container))

        // Hide the container
        this.state.hidden = true
        this.forceUpdate()
    }

    grabNode(node, instance, event) {
        let info, container

        if(instance) {
            container = ReactDOM.findDOMNode(this.refs.container)
            info      = this.getNodeInfo(instance)

            style.width  = info.width
            style.height = info.height
            style.top    = info.top
            style.left   = info.left

            // Make a clone of the node inside the container
            ReactDOM.render(Factory.createNode(node, {type: 'layout'}), container)

            // Record the current clientX and clientY
            this.previousX = event.clientX
            this.previousY = event.clientY

            // Register the mousemove event on the document
            jQuery(document).on('mousemove.dragcontainer', this.followCursor)


            // Show the container
            this.state.hidden = false
            this.forceUpdate()
        }
    }

    getNodeInfo(instance) {
        let $target    = jQuery(ReactDOM.findDOMNode(instance)),
            nodeOffset = $target.offset()

        return {
            width : $target.outerWidth(),
            height: $target.outerHeight(),
            top   : nodeOffset.top - jQuery(window).scrollTop(),
            left  : nodeOffset.left
        }
    }
}
