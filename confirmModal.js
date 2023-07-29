// Shadow dependency - Bootstrap 5 css, Font Awesome css
import defaults from "defaults";
import naja from "naja";
import * as bootstrap from 'bootstrap';

const defaultOptions = {
    najaHistory: "off",

    title: "Potvrzení",
    body: "Opravdu to chcete udělat?",
    cancel: "Zrušit",
    submit: "Ok",

    dataTitle: "data-modal-title",
    dataBody: "data-modal-body",
    dataCancel: "data-modal-cancel",
    dataSubmit: "data-modal-submit",
    dataHref: "data-modal-href",
    dataAjax: "data-modal-ajax",
}

class ConfirmModal{
    modal;
    title;
    body;
    cancel;
    submit;
    initialized = false;

    constructor(options = defaultOptions){
        this.options = options;
    }

    initialize(options = {}){
        if(this.initialized)
            return;
        this.options = defaults(options, this.options);
        this._createModal();
        this._setOnShow();
        this._setOnHide();
        this.initialized = true;
    }
    _createModal(){
        const template = document.createElement('template');
        template.innerHTML = `<div id="confirmModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">${this.options.title}</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">${this.options.body}</div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${this.options.cancel}</button>
                                                <a class="btn btn-primary" href="#!" data-naja-history="${this.options.najaHistory}">${this.options.submit}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        this.modal = template.content.firstElementChild;
        const content = this.modal.firstElementChild.firstElementChild;
        this.title = content.firstElementChild.firstElementChild;
        this.body = content.children[1];
        this.cancel = content.children[2].firstElementChild;
        this.submit = content.children[2].children[1];
        document.body.append(this.modal);
        this.submit.addEventListener("click", () => {
            bootstrap.Modal.getInstance(this.modal)?.hide();
        });
    }
    _setOnShow(){
        this.modal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const title = button.getAttribute(this.options.dataTitle);
            const body = button.getAttribute(this.options.dataBody);
            const cancel = button.getAttribute(this.options.dataCancel);
            const submit = button.getAttribute(this.options.dataSubmit);
            const href = button.getAttribute(this.options.dataHref);
            if(body === null){
                console.log("target:", button);
                throw new Error(`${this.options.dataBody} attribute on target not found!`);
            }
            if(href === null){
                console.log("target:", button);
                throw new Error(`${this.options.dataHref} attribute on target not found!`);
            }

            if(title !== null)
                this.title.innerHTML = title;
            this.body.innerHTML = body;
            if(cancel !== null)
                this.cancel.innerHTML = cancel;
            if(submit !== null)
                this.submit.innerHTML = submit;

            if(button.getAttribute(this.options.dataAjax) !== null){
                this.submit.setAttribute('href', href);
                this.submit.classList.add("ajax");
                naja.uiHandler.bindUI(this.submit);
            }else{
                this.submit.setAttribute('href', href);
            }
        })
    }
    _setOnHide(){
        this.modal.addEventListener('hidden.bs.modal', () => {
            this.title.innerHTML = this.options.title;
            this.body.innerHTML = this.options.body;
            this.cancel.innerHTML = this.options.cancel;
            this.submit.innerHTML = this.options.submit;
            this.submit.setAttribute('href', "#!");
            this.submit.classList.remove("ajax");
        });
    }
}

const confirmModal = new ConfirmModal();
export default confirmModal;