'use strict'

import Component from 'core/component.js'
import TextShadowColorPicker from 'core/components/node/configuration/inputs/textshadowcolorpicker.js'

import {sprintf} from 'sprintf-js'

import {getPos} from 'core/components/node/utilities/angles.js'

import $ from 'jquery'

// Actions
import {replaceStyle, toggleStyle, getStyle, getCascade, mergeStyle} from 'core/actions/styling.js'

for (var a = 0; a < 8; a++) {
    var pos = getPos(a * 45, 10)
}

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

        if (!textShadowString) {
            return (
                <div {...props} className='text-shadow'>
                    <ul>
                        <li className='title'>
                            Text Shadow
                            <input
                                type='checkbox'
                                className='checkbox'
                                checked={false}
                                onChange={() => {
                                this.toggleActive(false, textShadowParsed)
                            }}/>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div {...props} className='text-shadow'>
                    <ul>
                        <li className='title'>
                            Text Shadow
                            <input
                                type='checkbox'
                                className='checkbox'
                                checked={true}
                                onClick={() => {
                                this.toggleActive(true, textShadowParsed)
                            }}/>
                        </li>
                        <li className='color-picker'>
                            <span className='label'>
                                Color
                            </span>
                            <TextShadowColorPicker
                                {...props}
                                className='color display-inline-block'
                                value={textShadowParsed.color}/>
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
                                    onInput={e => {
                                    this.changeX(e, textShadowParsed)
                                }}/>
                                <input
                                    type='range'
                                    className='input'
                                    {...range.pos}
                                    value={textShadowParsed.x}
                                    onInput={e => {
                                    this.changeX(e, textShadowParsed)
                                }}/>
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
                                    onInput={e => {
                                    this.changeY(e, textShadowParsed)
                                }}/>
                                <input
                                    type='range'
                                    className='input'
                                    {...range.pos}
                                    value={textShadowParsed.y}
                                    onInput={e => {
                                    this.changeY(e, textShadowParsed)
                                }}/>
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
                                    onInput={e => {
                                    this.changeBlur(e, textShadowParsed)
                                }}/>
                                <input
                                    type='range'
                                    className='input'
                                    {...range.blur}
                                    value={textShadowParsed.blur}
                                    onInput={e => {
                                    this.changeBlur(e, textShadowParsed)
                                }}/>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        }
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

    changeX(event, orig) {
        console.log('event x')
        var x = parseInt(event.target.value)
        orig.x = x
        this.reStyle(orig)
    }

    changeY(event, orig) {
        console.log('event y')
        var y = parseInt(event.target.value)
        orig.y = y
        this.reStyle(orig)
    }

    changeBlur(event, orig) {
        var blur = parseInt(event.target.value)
        orig.blur = blur
        this.reStyle(orig)
    }

    changeColor(event, orig) {
        var color = event.target.value
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
