import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import React, { use } from "react"
import axios from 'axios'
import { useRouter } from "next/router"

export default function Banner(props) {

    const [name, setName] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [text_btn, setTextBtn] = React.useState('')

    const router = useRouter()

    const addBanner = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/add-banner`, {
                name, title, description, text_btn
            }).then(() => {
                console.log('success')
                return router.push("/admin/banners")
            })
        } catch(e){
            console.log(e)
        }
    }

    return (
        <Layout title="Создание нового баннера" user={props.user}>
            <div className="h2">
                <h2>Добавить баннер</h2>
            </div>
            <div className="info_content">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    addBanner()
                }}>
                    <div className="info_field">
                        <span>Название</span>
                        <input type="text" required onChange={e => {
                            setName(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Тайтл</span>
                        <input type="text" required onChange={e => {
                            setTitle(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Описание</span>
                        <input type="text" required onChange={e => {
                            setDescription(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Текст на кнопке</span>
                        <input type="text" required onChange={e => {
                            setTextBtn(e.target.value)
                        }} />
                    </div>
                    <button type="submit" className="buttonAdmin">Создать баннер</button>
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