'use strict'

import LayoutActions     from 'core/actions/layout.js'
import UIControlsActions from 'core/actions/controls.js'
import * as Components   from 'core/stores/components.js'

export default class ComponentSelection extends React.Component {
    render() {
        let groups          = []
        let componentGroups = Components.getGroups()

        for(let key of Object.keys(componentGroups)) {
            let group = componentGroups[key]

            if(_.size(group.components)) {
                let components = []

                _.each(group.components, (name) => {
                    let component = Components.get(name)

                    if(component.paneview !== undefined) {
                        components.push(
                            <component.paneview key={component.name} component={component.name} {...component} /> 
                        )
                    }
                })

                if(components.length) {
                    groups.push(
                        <div className="components-group" key={key}>
                            <h5>{group.title}</h5>
                            {components}
                        </div>
                    )
                }
            }
        }

        return <div className="ui-controls-components">{groups}</div>
    }
}