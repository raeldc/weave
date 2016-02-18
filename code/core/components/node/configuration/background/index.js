'use strict'

import CSSConfig       from 'core/components/node/configuration/cssconfig.js'
import UINodeActions   from 'core/actions/node.js'
import ColorPicker     from 'core/components/node/configuration/inputs/colorpicker.js'
import BackgroundImage from 'core/components/node/configuration/background/image.js'

// Drag and Drop
import { DragDropContext } from 'react-dnd';
import HTML5Backend        from 'react-dnd-html5-backend';

// Actions
import {
    mergeStyle,
    getStyle,
    reorderBackgrounds,
} from 'core/actions/styling.js'

class Background extends CSSConfig {
    render() {
        const style   = getStyle(this.props.node, this.props.device)

        return (
            <div className="config config-background">
                <h5>Background</h5>
                <ul className="background">
                    <li className="form-field background-image empty">
                        Drag and Drop an Image or Video Here
                        <a className="btn" onClick={event => this.openMediaManager()}><i className="fa fa-image" /> or Choose from Media Gallery</a>
                    </li>
                    {style.getBackgrounds().map(background => {
                        if(background.type === 'image') {
                            return (
                                <li className="form-field background-image" key={'bg-' + background.id}>
                                    <BackgroundImage {...background} node={this.props.node} device={this.props.device} reorder={this.reorderBackgrounds} />
                                </li>
                            )
                        }
                        // if gradient, render <BackgroundGradient />
                    })}
                    <li className="form-field">
                        <span className="label"><a className="fa fa-eye-slash" /> Background Color</span>
                        <ColorPicker {...this.props} className="color" property="backgroundColor" value={style.get('backgroundColor')} />
                    </li>
                </ul>
            </div>
        )
    }

    openMediaManager() {
        let manager;

        manager = wp.media.frames.backgroundImageManager = wp.media({
            title: 'Select a Background Image',
            library: {
                type: 'image'
            },
            button: {
                //Button text
                text: 'Select Image'
            },
            multiple: false,
        })

        manager.on('select', data => {
            // @see http://wordpress.stackexchange.com/questions/106030/wp-3-5-media-uploader-api-set-selected-item
            this.selectImage(manager.state().get('selection').first())
        }).open()
    }

    selectImage(data) {
        mergeStyle(this.props.node, {background: {
            type               : 'image',
            backgroundImage    : data.get('url'),
            backgroundSize     : 'auto',
            backgroundPositionX: 'left',
            backgroundPositionY: 'top',
        }}, this.props.device)
    }

    reorderBackgrounds(subject, target) {
        reorderBackgrounds(this.props.node, {
            subject: subject,
            target : target
        }, this.props.device)
    }
}

export default DragDropContext(HTML5Backend)(Background)
