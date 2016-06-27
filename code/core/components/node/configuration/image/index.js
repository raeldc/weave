import CSSConfig from 'core/components/node/configuration/cssconfig.js'
import BoxConfig from 'core/components/node/configuration/box/config.js'

// Actions
import Node from 'core/actions/node.js'

export default class Image extends CSSConfig {
    render() {
        const props = this.props
        const state = this.state
        return (
            <div className='config config-image'>
                <h5>Image</h5>
                <ul className='image'>
                    <li className='form-field'>
                        Drag and drop an image or video here
                        <a className='btn' onClick={event => this.openMediaManager()}>
                            <i className='fa fa-image'/>
                            or Choose from Media Gallery
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

    openMediaManager() {
        let manager;

        manager = wp.media.frames.backgroundImageManager = wp.media({
            title: 'Select an Image',
            library: {
                type: 'image'
            },
            button: {
                text: 'Select Image'
            },
            multiple: false
        })

        manager.on('select', data => {
            this.selectImage(manager.state().get('selection').first())
        }).open()
    }

    selectImage(data) {
        const node = this.props.node
        const properties = {
            src: data.get('url')
        }
        Node.updateNode(node, properties)
    }

}
