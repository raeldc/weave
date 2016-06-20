'use strict'

import Component from 'core/component.js'
import TextShadowColorPicker from 'core/components/node/configuration/inputs/textshadowcolorpicker.js'
import ReactColorPicker from 'react-color-picker'
import {sprintf} from 'sprintf-js'
import {getPos} from 'core/components/node/utilities/angles.js'

import $ from 'jquery'

// Actions
import {replaceStyle, toggleStyle, getStyle, getCascade, mergeStyle} from 'core/actions/styling.js'

export default class TextShadow extends Component {
    initialState() {
        return {colorPickerOpen: false}
    }

    parseStyles(args) {
        var ret = {}
        var numbers = args.match(/-?[0-9]+/g).map((v) => {
            return parseInt(v, 10)
        })
        var color = args.match(/#[0-9a-f]{6}/i)[0]
        ret.x = numbers[0]
        ret.y = numbers[1]
        ret.blur = numbers[2]
        ret.color = color

        return ret
    }

    render() {
        let style = getStyle(this.props.node, this.props.device),
            cascade = getCascade(this.props.node);
        const props = this.props
        const range = {
            pos: {
                min: -50,
                max: 50
            },
            blur: {
                min: 0,
                max: 50
            }
        }

        var textShadowString = style.get('textShadow')
        var textShadowParsed = this.parseStyles(textShadowString
            ? textShadowString
            : '2px -2px 2px #000000')

        var buttons = (
            <li className='form-field-group'>
                <a
                    className={'btn' + (textShadowString
                    ? ' active'
                    : '')}
                    onClick={e => this.activate(textShadowParsed)}
                    onMouseDown={e => this.stopEvent(e)}>
                    Text Shadow
                </a>
                <a
                    className={'btn' + (textShadowString
                    ? ''
                    : ' active')}
                    onClick={e => this.deactivate()}
                    onMouseDown={e => this.stopEvent(e)}>
                    None
                </a>
            </li>
        )

        if (!textShadowString) {
            return (
                <div {...props} className='text-shadow'>
                    <ul>
                        <li className='title'>
                            Text Shadow
                        </li>
                        {buttons}
                    </ul>
                </div>
            )
        } else {
            return (
                <div {...props} className='text-shadow' onMouseDown={e => e.stopPropagation()}>
                    <ul>
                        <li className='title'>
                            Text Shadow
                        </li>
                        {buttons}
                        <li>
                            <ReactColorPicker
                                saturationWidth={200}
                                saturationHeight={200}
                                value={textShadowParsed.color}
                                onChange={e => this.changeColor(e, textShadowParsed)}
                                onDrag={e => this.changeColor(e, textShadowParsed)}/>
                        </li>
                        <li className='display-inline'>
                            <div className='form-field-group'>
                                <span className='label'>
                                    Horizontal
                                </span>
                                <input
                                    type='number'
                                    className='input input-xs'
                                    {...range.pos}
                                    value={textShadowParsed.x}
                                    onChange={e => this.changeX(e, textShadowParsed)}
                                    onMouseDown={e => e.stopPropagation()}/>
                                <input
                                    type='range'
                                    className='input'
                                    {...range.pos}
                                    value={textShadowParsed.x}
                                    onChange={e => this.changeX(e, textShadowParsed)}
                                    onMouseDown={e => e.stopPropagation()}/>
                            </div>
                        </li>
                        <li className='display-inline'>
                            <div className='form-field-group'>
                                <span className='label'>
                                    Vertical
                                </span>
                                <input
                                    type='number'
                                    className='input input-xs'
                                    {...range.pos}
                                    value={textShadowParsed.y}
                                    onChange={e => this.changeY(e, textShadowParsed)}
                                    onMouseDown={e => e.stopPropagation()}/>
                                <input
                                    type='range'
                                    className='input'
                                    {...range.pos}
                                    value={textShadowParsed.y}
                                    onChange={e => this.changeY(e, textShadowParsed)}
                                    onMouseDown={e => e.stopPropagation()}/>
                            </div>
                        </li>
                        <li className='display-inline'>
                            <div className='form-field-group'>
                                <span className='label'>
                                    Blur
                                </span>
                                <input
                                    type='number'
                                    className='input input-xs'
                                    {...range.blur}
                                    value={textShadowParsed.blur}
                                    onChange={e => this.changeBlur(e, textShadowParsed)}
                                    onMouseDown={e => e.stopPropagation()}/>
                                <input
                                    type='range'
                                    className='input'
                                    {...range.blur}
                                    value={textShadowParsed.blur}
                                    onChange={e => this.changeBlur(e, textShadowParsed)}
                                    onMouseDown={e => e.stopPropagation()}/>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    stopEvent(event) {
        event.preventDefault()
        event.stopPropagation()
        console.log(event.isDefaultPrevented(), event.isPropagationStopped(), event)
    }

    toggleActive(active, data) {
        if (active) {
            mergeStyle(this.props.node, {
                textShadow: null
            }, this.props.device)
        } else {
            mergeStyle(this.props.node, {
                textShadow: sprintf('%dpx %dpx %dpx %s', data.x, data.y, data.blur, data.color)
            }, this.props.device)
        }
    }

    activate(data) {
        mergeStyle(this.props.node, {
            textShadow: sprintf('%dpx %dpx %dpx %s', data.x, data.y, data.blur, data.color)
        }, this.props.device)
    }

    deactivate() {
        mergeStyle(this.props.node, {
            textShadow: null
        }, this.props.device)
    }

    changeX(event, orig) {
        event.stopPropagation()
        var x = parseInt(event.target.value)
        console.log('event [%s] x: %d', event.type, x)
        orig.x = x
        this.reStyle(orig)
    }

    changeY(event, orig) {
        event.stopPropagation()
        var y = parseInt(event.target.value)
        console.log('event [%s] y: %d', event.type, y)
        orig.y = y
        this.reStyle(orig)
    }

    changeBlur(event, orig) {
        // this.stopEvent(event)
        event.stopPropagation()
        var blur = parseInt(event.target.value)
        console.log('event [%s] blur: %d', event.type, blur)
        orig.blur = blur
        this.reStyle(orig)
    }

    changeColor(color, orig) {
        orig.color = color
        this.reStyle(orig)
    }

    reStyle(data) {
        var textShadow = sprintf('%dpx %dpx %dpx %s', data.x, data.y, data.blur, data.color)
        mergeStyle(this.props.node, {
            textShadow
        }, this.props.device)
    }
}
// --- END OF FILE ---
