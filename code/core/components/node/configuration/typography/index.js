'use strict'

import Component from 'core/component.js'
import Nodes     from 'core/stores/nodes.js'

export default class Typography extends Component {
    initialState() {
        return Nodes.get(this.props.node)
    }

    render() {
        return (
            <div className="form-inline config config-typography">
                <h5>Typography</h5>
                <div className="wrapper">
                    <ul className="typography">
                        <li className="font clearfix">
                            <span className="family">Font <i className="fa fa-chevron-down pull-right" /></span>
                            <span className="style">
                                <span className="font-size">
                                    <a className="btn preset-size clearfix">Normal <i className="fa fa-caret-down pull-right" /></a>
                                    <input onChange={this.setInputValue} value={this.state.size} type="number" min="0" max="999" name="fontSize" defaultValue="12" />
                                </span>

                                <span className="color">
                                    <input onChange={this.setInputValue} value={this.state.color} type="text" name="color" defaultValue="#000" />
                                    <a className="btn color-picker fa fa-eyedropper" />
                                </span>
                            </span>
                        </li>
                        <li className="formatting clearfix">
                            <span className="alignment">
                                <a className="btn fa fa-align-left active" />
                                <a className="btn fa fa-align-center" />
                                <a className="btn fa fa-align-justify" />
                                <a className="btn fa fa-align-right" />
                            </span>
                            <span className="transform">
                                <a className="btn"><i className="fa fa-bold" /> <i className="fa fa-caret-down" /></a>
                                <a className="btn fa fa-italic" />
                                <a className="btn fa fa-underline" />
                                <a className="btn advanced"><i className="fa fa-cog " /> <i className="fa fa-caret-down" /></a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    setInputValue() {

    }
}