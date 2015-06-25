'use strict'

import Nodes         from 'core/stores/nodes.js'
import CSSConfig     from 'core/components/node/configuration/cssconfig.js'
import UINodeActions from 'core/actions/node.js'

export default class Css extends CSSConfig {
    render() {
        let node = Nodes.get(this.props.node)

        return (
            <div className="config config-css">
                <h5>CSS</h5>
                <ul className="css">
                    <li className="node">
                        <a className="btn fa fa-circle-o select" />
                        <span className="label">Selected Element</span>
                        <a className="btn fa fa-eye visibility" />
                    </li>
                    <li>
                        <a className="btn fa fa-link select active" />
                        <span className="label">Custom Class</span>
                        <a className="btn fa fa-eye visibility" />
                        <a className="btn fa fa-trash delete" />
                    </li>
                    <li>
                        <a className="btn fa fa-link select active" />
                        <span className="label">Another Class</span>
                        <a className="btn fa fa-eye visibility" />
                        <a className="btn fa fa-trash delete" />
                    </li>
                    <li className="new">
                        <a className="btn"><i className="fa fa-plus" /> New Class</a>
                    </li>
                    <li className="element">
                        <a className="btn fa fa-circle-o select" />
                        <span className="label">{'<' + node.element + '>'}</span>
                        <a className="btn fa fa-eye visibility" />
                    </li>
                </ul>
            </div>
        )
    }
}