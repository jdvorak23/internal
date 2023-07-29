// jQuery, jQueryUI

class RadioToggler{
    #radioName
    #speed
    #cases = [];
    $radios
    constructor(radioHtmlName, speed = 200) {
        this.#radioName = radioHtmlName;
        this.#speed = speed;
        this.$radios = $(`input[name="${this.#radioName}"]`);
        this.$radios.change(() => {
            this.toggle();
        });
    }

    /**
     * @param value {string}
     * @param selector {string}
     */
    addShowCase(value, selector){
        const theCase = {value: value, elements: $(selector)};
        this.#cases.push(theCase);
        return this;
    }
    toggle(speed = null){
        speed = speed === null ? this.#speed : speed;
        const value = this.$radios.filter(`input[name="${this.#radioName}"]:checked`).val() || "";
        for(const theCase of this.#cases){
            value === theCase.value
                ? theCase.elements.show(speed)
                : theCase.elements.hide(speed);
        }
    }
}

export default RadioToggler;