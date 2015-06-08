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
                            <a className="btn fa fa-bold active" />
                            <a className="btn fa fa-italic" />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}