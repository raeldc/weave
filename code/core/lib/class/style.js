'use strict'

const key = {
    selector   : Symbol('selector'),
    properties : Symbol('properties'),
    backgrounds: Symbol('backgrounds'),
    shadows    : Symbol('shadows'),
}

export default class Style {
    constructor(selector, properties = {}) {
        this[key.selector]    = selector
        this[key.properties]  = new Map()
        this[key.backgrounds] = new Map()
        this[key.shadows]     = new Map()

        if(_.isObject(properties)) {
            _.each(properties, (value, property) => {
                this.set(property, value)
            })
        }
    }

    getSelector() {
        return this[key.selector]
    }

    getProperties() {
        return this[key.properties]
    }

    set(property, value) {
        if(property === 'background') {
            const properties = _.isObject(value) ? value : {}
            this.setBackground(properties.id, properties)
        }
        else this[key.properties].set(property, value)

        return this
    }

    get(property, defaultValue) {
        return this[key.properties].get(property) || defaultValue
    }

    hasProperty(property) {
        return this[key.properties].has(property)
    }

    delete(...properties) {
        for(let property of properties) {
            this[key.properties].delete(property)
        }

        return this
    }

    merge(properties) {
        if(_.isObject(properties)) {
            _.each(properties, (value, property) => {
                this.set(property, value)
            })
        }

        return this
    }

    append(properties) {
        if(_.isObject(properties)) {
            _.each(properties, (value, property) => {
                if(!this.has(property)) {
                    this.set(property, value)
                }
            })
        }

        return this
    }

    replace(properties) {
        if(_.isObject(properties)) {
            this[key.properties].clear()
            this.merge(properties)
        }

        return this
    }

    compareProperty(property, value) {
        if(this.get(property) === value) {
            return true
        }

        return false
    }

    compareProperties(properties) {
        let result = false

        for(let property of Object.keys(properties)) {
            result = true

            if(this.get(property) !== properties[property]) {
                return false
            }
        }

        return result
    }

    toString() {
        let css = `${this[key.selector]} {\n`

        // Generate Normal Properties
        for(let [property, value] of this[key.properties]) {
            css += String(value).length ? `\t${_.toDash(property)}: ${value};\n` : ''
        }

        // Generate Backgrounds
        {
            let
                backgroundImages    = [],
                backgroundPositions = [],
                backgroundSizes     = [],
                backgroundRepeats   = []

            this.getBackgrounds().forEach(bg => {
                if(bg.type === 'image') {
                    backgroundImages.push(`url("${bg.backgroundImage}")`)
                    backgroundPositions.push(String(bg.backgroundPositionX || '0%') + ' ' + String(bg.backgroundPositionY || '0%'))
                    backgroundSizes.push(bg.backgroundSize ? bg.backgroundSize : String(bg.backgroundWidth || 'auto') + ' ' + String(bg.backgroundHeight || 'auto'))
                    backgroundRepeats.push(!bg.backgroundRepeatX && !bg.backgroundRepeatY ? 'no-repeat' : String(bg.backgroundRepeatX ? 'repeat-x' : '') + ' ' + String(bg.backgroundRepeatY ? 'repeat-y' : ''))
                }
            })

            if(backgroundImages.length) {
                css += `\tbackground-image: ${backgroundImages.join(',')};\n`
                css += `\tbackground-position: ${backgroundPositions.join(',')};\n`
                css += `\tbackground-size: ${backgroundSizes.join(',')};\n`
                css += `\tbackground-repeat: ${backgroundRepeats.join(',')};\n`
            }
        }

        css += '}'

        return css
    }

    /**
     * Return an array of ordered background objects
     */
     getBackgrounds() {
         return _.sortBy(Array.from(this[key.backgrounds].values()), 'ordering')
     }

     getBackground(id) {
         return this[key.backgrounds].get(id)
     }

     reorderBackgrounds(from, to) {
         const
             backgrounds       = this.getBackgrounds(),
             [subject, target] = [this.getBackground(from), this.getBackground(to)],
             targetOrdering    = target.ordering,
             subjectOrdering   = subject.ordering

         // if move higher
         if(targetOrdering > subjectOrdering) {
             backgrounds.forEach(bg => {
                 if(bg.ordering > subjectOrdering && bg.ordering <= targetOrdering) {
                     bg.ordering--
                 }
             })

             subject.ordering = targetOrdering
         }
         // if move lower
         else if(targetOrdering < subjectOrdering) {
             backgrounds.forEach(bg => {
                 if(bg.ordering >= targetOrdering && bg.ordering < subjectOrdering) {
                     bg.ordering++
                 }
             })

             subject.ordering = targetOrdering
         }
     }

     setBackground(id, properties = {}) {
         if(id === undefined) {
             properties.id       = id = _.uniqueId()
             properties.ordering = this[key.backgrounds].size
         }

         properties = _.extend(this[key.backgrounds].get(id) || {}, properties)

         this[key.backgrounds].set(id, properties)

         return this
     }

     removeBackground(...ids) {
         let ordering = 0

         ids.forEach(id => this[key.backgrounds].delete(id))

         this.getBackgrounds().forEach(bg => {
             bg.ordering = ordering
             ordering++
         })

         return this
     }
}
