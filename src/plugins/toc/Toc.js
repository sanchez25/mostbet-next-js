import React from 'react'
import ReactDOM from 'react-dom'
import style from './Toc.module.scss'
import TocList from './TocList'

export class Toc {

    static dataFromEditor = []

    static get toolbox() {
      return {
        title: 'Table of Contents',
        icon: '<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Edit / List_Ordered"><path id="Vector" d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>'
      };
    }

    constructor({ data, block }) {
      this.data = data
      this.blockAPI = block
    }

    static init(data) {

      let headings = []

        if (Array.isArray(data)) {
          for ( let item of data ) {
            headings.push({
                heading: item.data.text, 
                checked: true
            })
          }
        }
      console.log('data from TOC init', headings)
      return this.saveData(headings)
    }

    static retrieveData(){
      return this.dataFromEditor
    }

    static saveData(data){
      console.log('data from saveData', data)
      this.dataFromEditor = data 

    }

    render() {

        let setData = (data) => { 
          this.dataFromEditor = data 
          console.log('data from toc child', this.dataFromEditor)
          this.blockAPI.dispatchChange()
        }

        let wrapper = document.createElement('div')
        wrapper.setAttribute('class', style.wrapper)

        ReactDOM.render(
          <TocList 
              data={Toc.retrieveData()}
              css={style} 
              setData={setData} 
            />, 
          wrapper) 
        return wrapper
    }

    save() {
      console.log('saving TOC...', this.dataFromEditor)
      return this.dataFromEditor
    }

}