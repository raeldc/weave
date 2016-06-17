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
            var string = style
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
                type,
                style
            }
        })
    }
    return []
}

class BoxShadowManip extends Component {
    getParsedStyle() {
        const state = this.state,
            props = this.props,
            style = getStyle(props.node, props.device)
        var get = style.get('boxShadow')
        var parsedStyle = parseStyle(get
            ? get
            : '')
        var filteredStyle = parsedStyle.filter(e => (e.type == props.type))

        var hasOutset = (parsedStyle.filter(e => (e.type == 'outset')).length > 0
            ? true
            : false)
        var hasInset = (parsedStyle.filter(e => (e.type == 'inset')).length > 0
            ? true
            : false)
        var isValid = (filteredStyle.length > 0)
        this.status = {
            hasOutset,
            hasInset,
            isValid
        }

        if (filteredStyle.length > 0) {
            return filteredStyle[0]
        } else {
            return {
                x: 0,
                y: 0,
                blur: 0,
                spread: 0,
                color: '#000000',
                type: props.type,
                style: '0 0 0 0 #000000' + ((props.type == 'inset')
                    ? ' inset'
                    : '')
            }
        }
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
        var style = this.getParsedStyle()
        var status = this.status

        return (
            <div>
                <input
                    type='checkbox'
                    className='input'
                    checked={status.isValid}
                    onChange={e => this.toggleStyle(status, style)}/>
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

    toggleStyle(status, style) {
        status.isValid = !status.isValid
        this.applyShadow(style)
    }

    changeX(value, orig) {
        value = parseInt(value)
        orig.x = value
        this.applyShadow(orig)
    }

    changeY(value, orig) {
        value = parseInt(value)
        orig.y = value
        this.applyShadow(orig)
    }

    changeBlur(value, orig) {
        value = parseInt(value)
        orig.blur = value
        this.applyShadow(orig)
    }

    changeSpread(value, orig) {
        value = parseInt(value)
        orig.spread = value
        this.applyShadow(orig)
    }

    applyShadow(values) {
        const props = this.props,
            style = getStyle(props.node, props.device),
            status = this.status,
            newStyle = sprintf('%dpx %dpx %dpx %dpx %s%s', values.x, values.y, values.blur, values.spread, values.color, ((values.type == 'inset')
                ? ' inset'
                : ''))

        var string = style.get('boxShadow')
        if (!string) {
            string = ''
        }
        if (status.isValid) {
            // this particular box shadow is on and should be turned on
            if (props.type == 'outset') {
                if (!status.hasOutset && !status.hasInset) {
                    this.shadow(newStyle)
                } else if (!status.hasOutset && status.hasInset) {
                    this.shadow(newStyle + ', ' + string)
                } else if (status.hasOutset && !status.hasInset) {
                    this.shadow(newStyle)
                } else {
                    var replaceString = string.match(/(-?[0-9]+(px)?\s?){4} #[0-9a-f]{6},/i)
                    if (!replaceString) {
                        replaceString = ''
                    } else {
                        replaceString = replaceString[0]
                    }
                    string = string.replace(replaceString, newStyle + ',')
                    this.shadow(string)
                }
            } else {
                if (!status.hasOutset && !status.hasInset) {
                    this.shadow(newStyle)
                } else if (!status.hasOutset && status.hasInset) {
                    this.shadow(newStyle)
                } else if (status.hasOutset && !status.hasInset) {
                    this.shadow(string + ', ' + newStyle)
                } else {
                    var replaceString = string.match(/(-?[0-9]+(px)?\s?){4} #[0-9a-f]{6} inset/i)[0]
                    if (!replaceString) {
                        replaceString = ''
                    } else {
                        replaceString = replaceString[0]
                    }
                    string = string.replace(replaceString, newStyle)
                    this.shadow(string)
                }
            }
        } else {
            // this particular box shadow is off and should be turned off. working on
            // turning it off here
            if (props.type == 'outset') {
                if (status.hasOutset && !status.hasInset) {
                    this.shadow(null)
                } else if (status.hasOutset && status.hasInset) {
                    this.shadow(string.replace(/(-?[0-9]+(px)?\s?){4} #[0-9a-f]{6},\s/i, ''))
                }
            } else {
                if (status.hasOutset && status.hasInset) {
                    this.shadow(string.replace(/, (-?[0-9]+(px)?\s?){4} #[0-9a-f]{6} inset/i, ''))
                } else if (!status.hasOutset && status.hasInset) {
                    this.shadow(null)
                }
            }
        }
    }

    shadow(boxShadow) {
        console.log({boxShadow})
        mergeStyle(this.props.node, {
            boxShadow
        }, this.props.device)
    }
}

/**
 * BoxShadow
 * @author Wayne Dela Cruz
 */
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
