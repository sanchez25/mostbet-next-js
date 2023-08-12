import React from 'react'
import ReactDOM from 'react-dom'
import style from './Faq.module.scss'
import FaqList from './FaqList'

export class FAQ {
    static get toolbox() {
      return {
        title: 'FAQ',
        icon: '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 277.333c-58.974 0-106.667 47.693-106.667 106.667 0 11.782-9.551 21.333-21.333 21.333s-21.333-9.551-21.333-21.333c0-82.538 66.795-149.333 149.333-149.333S661.333 301.463 661.333 384c0 75.294-55.586 137.489-128 147.823V640c0 11.78-9.553 21.333-21.333 21.333S490.667 651.78 490.667 640V512c0-11.78 9.553-21.333 21.333-21.333 58.974 0 106.667-47.693 106.667-106.667S570.974 277.333 512 277.333zm0 506.454c23.565 0 42.667-19.102 42.667-42.667S535.565 698.453 512 698.453s-42.667 19.102-42.667 42.667 19.102 42.667 42.667 42.667z"/><path d="M512 85.333C276.358 85.333 85.333 276.358 85.333 512c0 235.639 191.025 426.667 426.667 426.667 235.639 0 426.667-191.027 426.667-426.667C938.667 276.358 747.64 85.333 512 85.333zM128 512c0-212.077 171.923-384 384-384 212.079 0 384 171.923 384 384 0 212.079-171.921 384-384 384-212.077 0-384-171.921-384-384z"/></svg>'
      };
    }

    constructor({ data, block }) {
      this.data = data
      this.blockAPI = block
    }

    static init(data) {
        this.data = data
        console.log('Data from init: ', this.data)
    }

    render() {

        let setData = (data) => { 
          this.data = data
          console.log('data from faq child', this.data)
          this.blockAPI.dispatchChange()
        }

        let wrapper = document.createElement('div')
        wrapper.setAttribute('class', style.faqWrapper)

        ReactDOM.render(<FaqList data={this.data} css={style} setData={setData} />, wrapper) 
        return wrapper

    }

    save() {
      return this.data
    }

  }