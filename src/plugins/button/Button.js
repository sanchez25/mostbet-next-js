import React from 'react'
import style from './Button.module.scss'

export class Button {

    static get toolbox() {
        return {
            title: 'Content Button',
            icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M17 3H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm.5 6c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V5c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v4zm-8-1.2h5V6.2h-5v1.6zM17 13H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm.5 6c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v4zm-8-1.2h5v-1.5h-5v1.5z"></path></svg>'
        };
    }

    constructor({ data }) {
        this.data = data
    }

    render() {

        let wrapper = document.createElement('div')
        wrapper.setAttribute('class', style.btnWrapper)
        let input = document.createElement('input')
        input.setAttribute('class', 'buttonInput')
        input.setAttribute('placeholder', 'Текст кнопки/id кнопки/split')
        input.value = this.data && this.data.button ? this.data.button : '';
        wrapper.appendChild(input)
        return wrapper

    }

    save(blockContent) {
        return {
            button: blockContent.querySelector('.buttonInput').value
        }
    }

}