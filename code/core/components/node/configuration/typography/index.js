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
                        <li className="font">Font <i className="fa fa-chevron-down pull-right" /></li>
                        <li className="formatting">
                            <span className="font-size">
                                <input onChange={this.setInputValue} value={this.state.size} type="number" min="0" max="999" name="fontSize" defaultValue="12" />
                            </span>
                            <span className="alignment">
                                <a className="btn fa fa-align-left active" />
                                <a className="btn fa fa-align-center" />
                                <a className="btn fa fa-align-justify" />
                                <a className="btn fa fa-align-right" />
                            </span>
                            <span className="styling">
                                <a className="btn fa fa-bold active" />
                                <a className="btn fa fa-italic" />
                                <a className="btn fa fa-underline" />
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