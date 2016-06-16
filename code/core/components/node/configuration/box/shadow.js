'use strict'

import Component from 'core/component.js'
import BoxConfig from 'core/components/node/configuration/box/config.js'
import DropDown from 'core/ui/elements/dropdown.js'

// Actions
import {mergeStyle, getStyle} from 'core/actions/styling.js'

// Functions
import {sprintf} from 'sprintf-js'

const parseStyle = (string) => {
    var match = string.match(/(-?[0-9]+(px)?\s?){4} #[0-9a-f]{6}( inset)?/ig)
    if (match) {
        return match.map(style => {
            var configs = style.match(/-?[0-9]+(px)?/g).map(e => {
                var a = e.match(/-?[0-9]+/)[0]
                return parseInt(a, 10)
            })
            var color = style.match(/#[0-9a-f]{6}/i)[0]
            var inset = /inset/i.test(style)
            var type
            if (inset) {
                type = 'inset'
            } else {
                type = 'outset'
            }

            return {
                x: configs[0],
                y: configs[1],
                blur: configs[2],
                spread: configs[3],
                color,
                inset,
                type
            }
        })
    }
    return []
}

const boxShadowString = (args) => {
    return args.map(e => sprintf('%dpx %dpx %dpx %dpx %s%s', e.x, e.y, e.blur, e.spread, e.color, e.inset
        ? ' inset'
        : '')).join(', ')
}

class BoxShadowManip extends Component {
    getParsedStyle() {
        const state = this.state,
            props = this.props,
            style = getStyle(props.node, props.device)
        var get = style.get('boxShadow')

        return parseStyle(get
            ? get
            : '')
    }

    render() {
        const state = this.state,
            props = this.props,
            range = {
                position: {
                    min: -50,
                    max: 50
                },
                blur: {
                    min: 0,
                    max: 50
                },
                spread: {
                    min: -50,
                    max: 50
                }
            }
        var filteredStyle = this.getParsedStyle().filter(e => {
            return (e.type == props.type)
        })
        var style = null
        if (filteredStyle.length > 0) {
            style = filteredStyle[0]
        } else {
            style = {
                x: 0,
                y: 0,
                blur: 0,
                spread: 0,
                color: '#000000',
                type: props.type
            }
        }

        return (
            <div>
                <input type='checkbox'/>
                <ul>
                    <li className='form-field-group'>
                        <span className='label'>
                            Horizontal
                        </span>
                        <input
                            type='number'
                            className='input'
                            {...range.position}
                            value={style.x}
                            onInput={e => this.changeX(e.target.value, style)}
                            onMouseDown={e => e.stopPropagation()}/>
                        <input
                            type='range'
                            className='input'
                            {...range.position}
                            value={style.x}
                            onInput={e => this.changeX(e.target.value, style)}
                            onMouseDown={e => e.stopPropagation()}/>
                    </li>
                    <li className='form-field-group'>
                        <span className='label'>
                            Vertical
                        </span>
                        <input
                            type='number'
                            className='input'
                            {...range.position}
                            value={style.y}
                            onInput={e => this.changeY(e.target.value, style)}
                            onMouseDown={e => e.stopPropagation()}/>
                        <input
                            type='range'
                            className='input'
                            {...range.position}
                            value={style.y}
                            onInput={e => this.changeY(e.target.value, style)}
                            onMouseDown={e => e.stopPropagation()}/>
                    </li>
                    <li className='form-field-group'>
                        <span className='label'>
                            Blur
                        </span>
                        <input
                            type='number'
                            className='input'
                            {...range.blur}
                            value={style.blur}
                            onInput={e => this.changeBlur(e.target.value, style)}
                            onMouseDown={e => e.stopPropagation()}/>
                        <input
                            type='range'
                            className='input'
                            {...range.blur}
                            onInput={e => this.changeBlur(e.target.value, style)}
                            onMouseDown={e => e.stopPropagation()}/>
                    </li>
                    <li className='form-field-group'>
                        <span className='label'>
                            Spread
                        </span>
                        <input
                            type='number'
                            className='input'
                            {...range.spread}
                            value={style.spread}
                            onInput={e => this.changeSpread(e.target.value, style)}
                            onMouseDown={e => e.stopPropagation()}/>
                        <input
                            type='range'
                            className='input'
                            {...range.spread}
                            value={style.spread}
                            onInput={e => this.changeSpread(e.target.value, style)}
                            onMouseDown={e => e.stopPropagation()}/>
                    </li>
                </ul>
            </div>
        )
    }

    changeX(value, orig) {
        value = parseInt(value)
        console.log(value)
    }

    changeY(value, orig) {
        value = parseInt(value)
        console.log(value)
    }

    changeBlur(value, orig) {
        value = parseInt(value)
    }

    changeSpread(value, orig) {
        value = parseInt(value)
    }
}

export default class BoxShadow extends BoxConfig {
    initialState() {
        const state = this.state,
            props = this.props

        var openOutset = false,
            openInset = false

        return {openOutset, openInset}
    }

    render() {
        const style = getStyle(this.props.node, this.props.device),
            state = this.state,
            props = this.props
        return (
            <div className='box-shadow-config'>
                <ul className='box-shadow'>
                    <li className='title'>
                        Box Shadows {' '}
                        <span>
                            [Outset: {state.openOutset
                                ? 'true'
                                : 'false'}]
                        </span>
                        {' '}
                        <span>
                            [Inset: {state.openInset
                                ? 'true'
                                : 'false'}]
                        </span>
                    </li>
                    <li className='btn-wrapper'>
                        <a
                            ref='outsetBtn'
                            className={'btn' + (state.openOutset
                            ? ' active '
                            : '')}
                            onClick={e => this.toggleOutset()}>
                            Outset
                        </a>
                    </li>
                    <li className='btn-wrapper'>
                        <a
                            ref='insetBtn'
                            className={'btn' + (state.openInset
                            ? ' active'
                            : '')}
                            onClick={e => this.toggleInset()}>
                            Inset
                        </a>
                    </li>
                </ul>
                {this.getOutsetDropdown()}
                {this.getInsetDropdown()}
            </div>
        )
    }

    toggleOutset() {
        const state = this.state
        var openInset = state.openInset
        if (openInset) {
            openInset = !openInset
        }
        this.setState({
            openOutset: !state.openOutset,
            openInset
        })
    }

    toggleInset() {
        const state = this.state
        var openOutset = state.openOutset
        if (openOutset) {
            openOutset = !openOutset
        }
        this.setState({
            openInset: !state.openInset,
            openOutset
        })
    }

    getOutsetDropdown() {
        const state = this.state
        const props = this.props
        // const style = getStyle(props.node, props.device)
        if (state.openOutset) {
            return (
                <DropDown subject={this.refs.outsetBtn}>
                    <BoxShadowManip {...props} inset={false} type='outset'/>
                </DropDown>
            )
        }
    }

    getInsetDropdown() {
        const state = this.state
        const props = this.props
        // const style = getStyle(props.node, props.device)
        if (state.openInset) {
            return (
                <DropDown subject={this.refs.insetBtn}>
                    <BoxShadowManip {...props} inset={true} type='inset'/>
                </DropDown>
            )
        }
    }
}
// end of file
