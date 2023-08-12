import React, { useState } from "react"
import { useEffect } from "react"

export default function FaqList( {data, css, setData} ) { 

    const initialValues = (Array.isArray(data)) ? data : [{ question: '', answer: ''}]
    
    console.log(data, 'FAQ props.data')

    const [ values, setValues ] = useState(initialValues)

    useEffect(() => {
        console.log('FAQ was changed', values)
        setData(values)
     }, [values])

    const addRow = () => {
        setValues([...values, {
            question: '', 
            answer: ''
        }])
        setData(values)
    }

    const removeRow = (event, index) => {
        let rows = [...values]
        rows.splice(index, 1)
        setValues(rows)
        setData(rows)
    }

    const changeInput = (event, index) => {
        let { name, value } = event.target
        let rows = [...values]
        rows[index][name] = value
        setValues(rows)
        setData(rows)
    }

    return(

        <div className={css.container}>
            <h4>Вопрос-ответ</h4>
            {values.map((item, index) => {
                let { question, answer } = item

                return(
                    <div key={index} className={css.item}>
                        <div>
                            <input 
                            type="text"
                            placeholder="Введите вопрос"
                            name="question"
                            value={question}
                            onChange={(event) => {changeInput(event, index)}}/>
                        </div>
                        <div>
                            <input
                            type="text"
                            placeholder="Введите ответ"
                            name="answer"
                            value={answer}
                            onChange={(event) => {changeInput(event, index)}}/>
                        </div>
                        <div>
                            { (values.length > 1) ? 
                                <span
                                onClick={(event) => {removeRow(event, index)}}>
                                Удалить
                                </span>
                            : '' }
                        </div>
                    </div>
                )

            })}
            <span 
                onClick={addRow}>
                Добавить ещё
            </span>
        </div>
        

    )

}