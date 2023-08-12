import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import React, { useState } from "react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

export default function editSidebar(props) {

    const [name, setName] = React.useState(props.editSidebar.name)
    const [banner_title, setBannerTitle] = React.useState(props.editSidebar.banner_title)
    const [banner_price, setBannerPrice] = React.useState(props.editSidebar.banner_price)
    const [text_btn, setTextBtn] = React.useState(props.editSidebar.text_btn)
    const [top_one, setTopItemOne] = useState(props.editSidebar.top_one)
    const [top_two, setTopItemTwo] = useState(props.editSidebar.top_two)
    const [top_three, setTopItemThree] = useState(props.editSidebar.top_three)
    const [bottom_one, setBottomItemOne] = useState(props.editSidebar.bottom_one)
    const [bottom_two, setBottomItemTwo] = useState(props.editSidebar.bottom_two)
    const [bottom_three, setBottomItemThree] = useState(props.editSidebar.bottom_three)
    const [bottom_four, setBottomItemFour] = useState(props.editSidebar.bottom_four)
    const [bottom_five, setBottomItemFive] = useState(props.editSidebar.bottom_five)

    const id = props.editSidebar.id

    const router = useRouter()

    const editSidebar = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/edit-sidebar`, {
                id, name, banner_title, banner_price, text_btn, top_one, top_two, top_three, bottom_one, bottom_two,
                bottom_three, bottom_four, bottom_five
            }).then(() => {
                console.log('Sidebar successfully edited!')
                return router.push("/admin/sidebars")
            })
        } catch(e){
            console.log(e)
        }
    }

    const deleteSidebar = async () => {

        MySwal.fire({
            title: 'Точно хотите удалить сайдбар?',
            showDenyButton: true,
            confirmButtonText: 'Точно',
            denyButtonText: 'Не хочу',
        }).then(async (result) => {

            if (result.isConfirmed) {
                try{
                    await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/delete-sidebar`, {
                        id
                    }).then(() => {
                        console.log('Category successfully deleted!')
                        return router.push("/admin/sidebars")
                    })
                } catch(e){
                    console.log(e)
                }
            } else if (result.isDenied) {
                return false
            }
        })
    }

    return (

        <Layout title="Редактирование сайдбара" user={props.user}>
            <div className="h2">
                <h2>Редактирование: {props.editSidebar.name}</h2>
            </div>
            <div className="info_content">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    editSidebar()
                }}>
                    <div className="info_field">
                        <span>Название</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.name}
                            onChange={e => {setName(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Тайтл бонуса</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.banner_title}
                            onChange={e => {setBannerTitle( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Сумма бонуса</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.banner_price}
                            onChange={e => {setBannerPrice( e.target.value )}}
                        />
                    </div>
                    <div className="info_field">
                        <span>Текст на кнопке</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.text_btn}
                            onChange={e => {setTextBtn( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Популярное</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.top_one}
                            onChange={e => {setTopItemOne( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Новое</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.top_two}
                            onChange={e => {setTopItemTwo( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Избранное</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.top_three}
                            onChange={e => {setTopItemThree( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Слоты</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.bottom_one}
                            onChange={e => {setBottomItemOne( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Рулетка</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.bottom_two}
                            onChange={e => {setBottomItemTwo( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Карты</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.bottom_three}
                            onChange={e => {setBottomItemThree( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Лотереи</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.bottom_four}
                            onChange={e => {setBottomItemFour( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Виртуальные</span>
                        <input
                            type="text"
                            defaultValue={props.editSidebar.bottom_five}
                            onChange={e => {setBottomItemFive( e.target.value )}}
                            required
                        />
                    </div>
                    <button type="submit" className="buttonAdmin">Сохранить сайдбар</button>
                </form>
                <button onClick={deleteSidebar} className="buttonDelete">Удалить сайдбар</button>
            </div>
        </Layout>
    )
}

export const getServerSideProps = withSessionSsr(

    async ({req, res, params}) => {

        const prisma = new PrismaClient()

        let user = req.session.user || null

        const editSidebar = await prisma.sidebar.findUnique({
            where: {
                id: parseInt(params.id),
            },
        })

        return {
            props: {
                user: user,
                editSidebar: editSidebar
            }
        }
    }
)