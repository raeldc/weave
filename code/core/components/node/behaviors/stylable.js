import {addClass}     from 'core/components/node/behaviors/classable.js'
import {defaultStyle} from 'core/actions/styling.js'

function afterMount(component) {
    if('css' in component.props.component.defaults) {
        _.each(component.props.component.defaults.css, (style, device) => {
            defaultStyle(component.props.id, style, device)
        })
    }
}

function beforeRender(component) {
    addClass(component, component.props.id)
}

export default {beforeRender, afterMount}
