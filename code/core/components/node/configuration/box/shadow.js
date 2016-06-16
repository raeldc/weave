'use strict'

import BoxConfig from 'core/components/node/configuration/box/config.js'

// Actions
import {mergeStyle, getStyle} from 'core/actions/styling.js'

const parseStyle = (string) => {
    return string.match(/(-?[0-9]+(px)?\s?){4} #[0-9a-f]{6}( inset)?/ig).map(style => {
        var configs = style.match(/-?[0-9]+(px)?/g).map(e => {
            var a = e.match(/-?[0-9]+/)[0]
            return parseInt(a, 10)
        })
        var color = style.match(/#[0-9a-f]{6}/i)[0]
        var inset = /inset/i.test(style)

        return {
            x: configs[0],
            y: configs[1],
            blur: configs[2],
            spread: configs[3],
            color,
            inset
        }
    })
}

console.log(parseStyle('5px 5px 5px 5px #fafafa, -3px -4px 0px 5px #31fa64 inset'))

export default class BoxShadow extends BoxConfig {
    initialState() {
        return {openOutset: false, openInset: false}
    }
    render() {
        const style = getStyle(this.props.node, this.props.device)
        return (
            <ul className='box-shadow'>
                <li className='title'>
                    Box Shadows
                </li>
                <li className='btn-wrapper'>
                    <a className='btn'>
                        Outset
                    </a>
                </li>
                <li className='btn-wrapper'>
                    <a className='btn'>
                        Inset
                    </a>
                </li>
            </ul>
        )
    }
}
