'use strict'

import Component from 'core/component.js'
import ColorPicker from 'core/components/node/configuration/inputs/colorpicker.js'
import {sprintf} from 'sprintf-js'

import {getPos} from 'core/components/node/utilities/angles.js'

import $ from 'jquery'

// Actions
import {replaceStyle, toggleStyle, getStyle, getCascade, mergeStyle} from 'core/actions/styling.js'

for (var a = 0; a < 8; a++) {
    var pos = getPos(a * 45, 10)
}

export default class TextShadow extends Component {
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

        var textShadowString = style.get('textShadow')
        var textShadowParsed = this.parseStyles(textShadowString
            ? textShadowString
            : '0 0 0 #000000')
        var sets = null

        if (textShadowString) {
            // sets = (     <div>         <div className='row'>             <div
            // className='label'>                 Color             </div>             <div
            // className='comp'>                 <input                     type='color'
            //         value={textShadowParsed.color} onChange={e => {   this.changeColor(e,
            // textShadowParsed)              }}/>             </div>        </div>
            // <hr/> <div className='row'>             <div className='label-wrapper'>
            // <div className='form-field-group'>         <span className='label'>
            //               Horizontal </span>                   <input
            //     type='number'     className='input input-xs' value={textShadowParsed.x}
            //   onInput={e => {              this.changeX(e, textShadowParsed)
            // }}/>           </div>             </div>             <div className='comp'>
            //        <input                     type='range' min='-25'
            // max='25' value={textShadowParsed.x} onInput={e => {      this.changeX(e,
            // textShadowParsed)                 }}/> </div>         </div>         <div
            // className='row'>             <div className='label-wrapper'>
            // <div className='form-field-group'>                     <span
            // className='label'> Vertical                     </span>
            // <input type='number'                         className='input input-xs'
            // value={textShadowParsed.x}                         onInput={e => {
            //   this.changeY(e, textShadowParsed)   }}/>                 </div>
            // </div>             <div className='comp'>                 <input
            //      type='range'                 min='-25' max='25'
            // value={textShadowParsed.y}                     onInput={e => {
            // this.changeY(e, textShadowParsed)                 }}/> </div>         </div>
            //       <div className='row'>             <div className='label-wrapper'>
            //      <div className='form-field-group'>                     <span
            // className='label'>                         Blur                 </span>
            //         <input type='number'                         className='input
            // input-xs'            value={textShadowParsed.blur} onInput={e => {
            //              this.changeBlur(e, textShadowParsed)        }}/>
            // </div>             </div>             <div className='comp'>
            // <input                     type='range'             min='0'
            //   max='25' value={textShadowParsed.blur}                     onInput={e => {
            // this.changeBlur(e, textShadowParsed)                 }}/> </div> </div>
            // </div> )
        }

        return (
            <div {...props}>
                <ul>
                    <li className='title'>
                        Text Shadow
                        <input
                            type='checkbox'
                            className='checkbox'
                            checked={textShadowString
                            ? true
                            : false}
                            onClick={() => {
                            this.toggleActive(textShadowString
                                ? true
                                : false, textShadowParsed)
                        }}/>
                    </li>
                </ul>
            </div>
        )
    }

    toggleActive(active, data) {
        // console.log(active, data)
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
        var x = parseInt(event.target.value)
        var str = sprintf('%dpx %dpx %dpx %s', x, orig.y, orig.blur, orig.color)
        mergeStyle(this.props.node, {
            textShadow: str
        }, this.props.device)
    }

    changeY(event, orig) {
        var y = parseInt(event.target.value)
        var str = sprintf('%dpx %dpx %dpx %s', orig.x, y, orig.blur, orig.color)
        mergeStyle(this.props.node, {
            textShadow: str
        }, this.props.device)
    }

    changeBlur(event, orig) {
        var blur = parseInt(event.target.value)
        var str = sprintf('%dpx %dpx %dpx %s', orig.x, orig.y, blur, orig.color)
        mergeStyle(this.props.node, {
            textShadow: str
        }, this.props.device)
    }

    changeColor(event, orig) {
        var color = event.target.value
        console.log(color)
        var str = sprintf('%dpx %dpx %dpx %s', orig.x, orig.y, orig.blur, color)
        mergeStyle(this.props.node, {
            textShadow: str
        }, this.props.device)
    }
}
