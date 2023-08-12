import React, { useState, useEffect } from "react"
import axios from "axios";

const CustomBundle = (props) => {

    let currentItem = {}

    for(let item of props.posts) {
        if(props.id == item.id) {
            currentItem = item
            break
        }
    }

    const [bindings, setBindings] = useState( currentItem.bindings ? currentItem.bindings.split(',') : [] )

    const changeBindingsPost = async (id, bindings) => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/change-bindings`, {id,bindings})
                .then(() => {
                    console.log(`successfully changed key for page ${id} with value ${bindings}`)
                })
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        //console.log('TOC was changed', bindings)
    }, [bindings])

    function bindCallback(value, id, index) {
        let rows = [...bindings]
        if(rows.includes(value)) {
            rows.splice(index, 1);
        } else {
          rows.push(value);
        }
        setBindings(rows)
        changeBindingsPost(id, rows.join(','))
    }

    return (
        <>
            { props.posts.map((postItem, index) => (
                <div data-key={postItem.id} className="pages_item">
                    <input
                        type="checkbox"
                        id={postItem.id}
                        checked={ bindings.includes(String(postItem.id)) }
                        value={postItem.id}
                        onChange={event => bindCallback(event.target.value, props.id, index)}
                    />
                    <span>{ postItem.title }</span>
                </div>
            ))}
        </>
    )
}

export default CustomBundle