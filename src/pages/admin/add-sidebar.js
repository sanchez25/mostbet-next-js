import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import React, {use, useState} from "react"
import axios from 'axios'
import { useRouter } from "next/router"

export default function Sidebar(props) {

    const [name, setName] = React.useState('')
    const [banner_title, setBannerTitle] = React.useState('')
    const [banner_price, setBannerPrice] = React.useState('')
    const [text_btn, setTextBtn] = React.useState('')
    const [top_one, setTopItemOne] = React.useState('')
    const [top_two, setTopItemTwo] = React.useState('')
    const [top_three, setTopItemThree] = React.useState('')
    const [bottom_one, setBottomItemOne] = React.useState('')
    const [bottom_two, setBottomItemTwo] = React.useState('')
    const [bottom_three, setBottomItemThree] = React.useState('')
    const [bottom_four, setBottomItemFour] = React.useState('')
    const [bottom_five, setBottomItemFive] = React.useState('')

    const router = useRouter()

    const addSidebar = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/add-sidebar`, {
                name, banner_title, banner_price, text_btn, top_one, top_two, top_three, bottom_one, bottom_two,
                bottom_three, bottom_four, bottom_five
            }).then(() => {
                console.log('success')
                return router.push("/admin/sidebars")
            })
        } catch(e){
            console.log(e)
        }
    }

    return (
        <Layout title="Создание нового сайдбара" user={props.user}>
            <div className="h2">
                <h2>Добавить сайдбар</h2>
            </div>
            <div className="info_content">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    addSidebar()
                }}>
                    <div className="info_field">
                        <span>Название</span>
                        <input type="text" required onChange={e => {
                            setName(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Тайтл бонуса</span>
                        <input type="text" required onChange={e => {
                            setBannerTitle(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Сумма бонуса</span>
                        <input type="text" required onChange={e => {
                            setBannerPrice(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Текст на кнопке</span>
                        <input type="text" required onChange={e => {
                            setTextBtn(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Популярное</span>
                        <input type="text" required onChange={e => {
                            setTopItemOne(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Новое</span>
                        <input type="text" required onChange={e => {
                            setTopItemTwo(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Избранное</span>
                        <input type="text" required onChange={e => {
                            setTopItemThree(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Слоты</span>
                        <input type="text" required onChange={e => {
                            setBottomItemOne(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Рулетка</span>
                        <input type="text" required onChange={e => {
                            setBottomItemTwo(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Карты</span>
                        <input type="text" required onChange={e => {
                            setBottomItemThree(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Лотереи</span>
                        <input type="text" required onChange={e => {
                            setBottomItemFour(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Виртуальные</span>
                        <input type="text" required onChange={e => {
                            setBottomItemFive(e.target.value)
                        }} />
                    </div>
                    <button type="submit" className="buttonAdmin">Создать сайдбар</button>
                </form>
            </div>
        </Layout>
    )
}

export const getServerSideProps = withSessionSsr(

    async ({req, res}) => {

        let user = req.session.user || null

        return {
            props: {
                user: user
            }
        }
    }
)