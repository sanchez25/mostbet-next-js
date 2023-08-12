import React, { useState } from "react"
import { useEffect } from "react"

export default function TocList({css, data, setData}) { 

    const initialValues = (Array.isArray(data)) ? data : []

    console.log(data, ' TOC props.data')

    const [ values, setValues ] = useState(initialValues)

    useEffect(() => {
        console.log('TOC was changed', values)
        setData(values)
     }, [values])

    const changeInput = (event, index) => {

        let { name, value, checked } = event.target
        let rows = [...values]
        rows[index][name] =  (event.target.type == 'checkbox') ? checked : value
        setValues(rows)
        setData(rows)
    }

    return(

        <div className={css.container}>
            <h4>Содержание</h4>
            {
            values.map((item, index) => {
                
                let {heading, checked} = item

                return(
                    <div key={index} className={css.item}>
                        <div className={css.input}>
                            <input 
                            type="text"
                            name="heading"
                            value={heading}
                            onChange={(event) => {changeInput(event, index)}}/>
                        </div>
                        <div className={css.check}>
                            <input
                                type="checkbox"
                                name="checked"
                                checked={checked}
                                id={index}
                                onChange={(event) => {changeInput(event, index)}}
                            />
                            <label htmlFor={index}>Добавлять в Table of Contents</label>
                        </div>
                    </div>
                )

            })}
        </div>
        

    )

}