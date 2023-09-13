class BaseDOM {
    constructor(options){
        this.options = options;
    }
    /**
     * Init all declared but not initialised class properties - by option with same name in options
     */
    _init(){
        for(const prop in this){
            if(typeof this[prop] !== 'undefined' || prop === 'options') continue;
            this[prop] = this._getElement(prop);
        }
    }
    /**
     * @param {string} name
     * @param {Document|Element} scope
     * @returns {Element}
     */
    _getElement(name, scope = document){
        if(!this.options[name])
            throw new Error(`Error in class ${this.constructor.name}. Option '${name}' is not set`);
        const element = (typeof this.options[name] === 'string')
            ? scope.querySelector(this.options[name])
            : this.options[name];
        if( !(element instanceof Element) )
            throw new Error(`Error in class ${this.constructor.name}. Option '${name}' is not Element, nor valid selector.`);
        return element;
    }

    /**
     * @param {string} name
     * @param {Document|Element} scope
     * @returns {Element|null}
     */
    _tryElement(name, scope = document){
        if(!this.options[name])
            return null;
        const element = (typeof this.options[name] === 'string')
            ? scope.querySelector(this.options[name])
            : this.options[name];
        if( !(element instanceof Element) )
            return null;
        return element;
    }

    /**
     * @param {string} name
     * @param {Document|Element} scope
     * @returns {Array}
     */
    _getElements(name, scope = document){
        if(!this.options[name])
            throw new Error(`Error in ${this.constructor.name}. Option '${name}' is not set`);
        const elements = (typeof this.options[name] === 'string')
            ? scope.querySelectorAll(this.options[name])
            : this.options[name];
        if( !(elements instanceof NodeList) )
            throw new Error(`Error in ${this.constructor.name}. '${name}' is not NodeList, nor valid selector.`);
        return [... elements];
    }

    /**
     * @param {string} name
     * @param {Document|Element} scope
     * @returns {Array}
     */
    _tryElements(name, scope = document){
        if(!this.options[name])
            return [];
        if(typeof this.options[name] === 'string'){
            return [... scope.querySelectorAll(this.options[name])];
        }else if(this.options[name] instanceof NodeList){
            return [... this.options[name]]
        }
        return [];
    }

    /**
     *
     * @param elements {Element|NodeList|Array}
     * @returns {[]}
     */
    _getElementsFrom(elements){
        let els = [];
        if(elements instanceof Element)
            els = [elements];
        if(elements instanceof NodeList)
            els = [... elements]
        if(elements.constructor === Array){
            for(const element of elements){
                if(element instanceof Element)
                    els.push(element);
            }
        }
        return els;
    }

    _display(elements){
        for(const element of this._getElementsFrom(elements)){
            element.classList.remove("d-none");
        }
    }

    _hide(elements){
        for(const element of this._getElementsFrom(elements)){
            element.classList.add("d-none");
        }
    }
    _conditionalDisplay(elements, display = true){
        if(display){
            this._display(elements);
        }else{
            this._hide(elements);
        }
    }

    el(html){
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    };
}
export default BaseDOM;