'use strict'

import CSSConfig       from 'core/components/node/configuration/cssconfig.js'
import UINodeActions   from 'core/actions/node.js'
import ColorPicker     from 'core/components/node/configuration/inputs/colorpicker.js'
import BackgroundImage from 'core/components/node/configuration/background/image.js'

// Actions
import {
    mergeStyle,
    toggleStyle,
    getStyle,
    getCascade
} from 'core/actions/styling.js'

export default class Background extends CSSConfig {
    render() {
        const style   = getStyle(this.props.node, this.props.device)
        const cascade = getCascade(this.props.node, this.props.device)

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
                                    <BackgroundImage {...background} node={this.props.node} device={this.props.device} />
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

        if(wp.media.frames.backgroundImageManager === undefined) {
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
            .on('select', data => {
                // @see http://wordpress.stackexchange.com/questions/106030/wp-3-5-media-uploader-api-set-selected-item
                this.selectImage(manager.state().get('selection').first())
            })
        }
        else manager = wp.media.frames.backgroundImageManager

        manager.open();
    }

    selectImage(data) {
        mergeStyle(this.props.node, {background: {
            type            : 'image',
            backgroundImage : data.get('url')
        }}, this.props.device)
    }
}
