import { useState } from "react"
import axios from 'axios'
import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function addMenu(props){

    const [cardList, setCardList]  = useState([])

    const [currentCard, setCurrentCard] = useState(null)
    const [val, setVal] = useState('')
    const [link, setLink] = useState('')
    const [menuName, setMenuName] = useState('Новое меню')

    function setValInList(e, card, index){
        let { name, value } = e.target
        let rows = [...cardList]
        rows[index][name] =  value
        setCardList(rows)
        console.log('new list from setVal', cardList)
    }

    function dragStartHandler(e, card){
        console.log('drag', card)
        setCurrentCard(card)
    }

    function dragLeaveHandler(e){
      
    }

    function dragEndHandler(e){
        console.log('new list', cardList)
    }

    function dragOverHandler(e){
        e.preventDefault()
    }

    function dropHandler(e, card){
        e.preventDefault()
        console.log('drop', card)
        setCardList(cardList.map( c => {
            if( c.id === card.id ) {
                return{...c, order:currentCard.order}
            }
            if( c.id === currentCard.id ) {
                return{...c, order:card.order}
            }
            return c
        }))
    }

    function deleteCardItem(e, index){
        let rows = [...cardList]
        rows.splice(index, 1)
        setCardList(rows)
    }

    function addCardItem(){
        setCardList([...cardList, {
            id: Math.max(...cardList.map(i => i.id)) + 1,
            order: Math.max(...cardList.map(i => i.id)) + 1,
            title: 'Custom title',
            slug: '#'
        }])
    }

    async function saveMenu (){
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/save-menu`, {
                name: menuName,
                value: JSON.stringify(cardList)
            }).then(() => {
                console.log('success')
                return router.push("/admin/pages")
            })
        } catch(e){
            console.log(e)
        }
    }

    const sortCards = (a,b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    async function generateMenu(e) {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/get-posts-by-lang`, {
                id: parseInt(e.target.value)
            })
            .then(json => {
                //setCardList(json.data.data)
                setCardList(json.data.data.map( c => {
                    return{...c, order: c.id}   
                }))
            })
        } catch(e){
            console.log(e)
        }
    } 

    return(
        <Layout title="Создание меню" user={props.user}>
            <h2>Menu creation</h2>
            <div className="cardList">
                <div className="select">
                    {props.categories.map(lang => 
                        <div key={lang.id}>
                            <input type="radio" id={lang.slug} name="languages" defaultValue={lang.id}
                            onChange={(e) => generateMenu(e)}/>
                            <label htmlFor={lang.slug}>{lang.title}</label>
                        </div>
                    )}
                    
                </div>

                {cardList.length > 0 ?      
                    <div className="menuName">
                        <input 
                            type="text" 
                            placeholder="Введите название меню"
                            onChange={(e) => setMenuName(e.target.value)}
                            defaultValue={menuName}
                        />
                    </div>
                : '' }

                {cardList.sort(sortCards).map((card, index) =>
                    <div 
                        className="cardItem"
                        key={card.id}
                        draggable={true}
                        onDragStart={(e) => dragStartHandler(e, card)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, card)}  
                    >
                        <div 
                            className="remove"
                            onClick={ e => deleteCardItem(e, index)} 
                        >
                            <span>x</span>
                        </div>
                        <h3>{card.title}</h3>
                        <div className="input">
                            <span>Текст ссылки: </span> 
                            <input type="text" name="title"
                                defaultValue={card.title} 
                                onChange={ e => {
                                    setVal(e.target.value)
                                    setValInList(e, card, index)
                                }} 
                            />
                        </div>
                        <div className="input">
                            <span>URL ссылки: </span> 
                            <input type="text" name="slug"
                                defaultValue={card.slug} 
                                onChange={ e => {
                                    setVal(e.target.value)
                                    setValInList(e, card, index)
                                }}  
                            />
                        </div>
                    </div>
                )} 

            {cardList.length > 0 ?
                <>
                    <button 
                        className="addItem"
                        onClick={addCardItem}
                    >
                        <span>+</span>
                    </button>
                    <div className="saveButton">
                        <button 
                            className="buttonAdmin"
                            onClick={saveMenu}
                        >
                            Создать меню
                        </button>
                    </div>
                </>
            : ''}
            </div>
        </Layout>
        
    )

}

export const getServerSideProps = withSessionSsr(
        
    async ({req, res}) => {
    
        let user = req.session.user || null

        const categories = await prisma.lang.findMany() || null

        return {
            props: { 
                user: user,
                categories: categories
            }
        }
    }
)