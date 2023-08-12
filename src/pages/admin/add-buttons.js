import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import React, { use } from "react"
import axios from 'axios'
import { useRouter } from "next/router"

export default function Buttons(props) {

    const [name, setName] = React.useState('')
    const [btn_log, setBtnLog] = React.useState('')
    const [btn_reg, setBtnReg] = React.useState('')
    const [btn_download, setBtnDownload] = React.useState('')
    const [btn_promo, setBtnPromo] = React.useState('')

    const router = useRouter()

    const addButtons = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/add-buttons`, {
                name, btn_log, btn_reg, btn_download, btn_promo
            }).then(() => {
                console.log('success')
                return router.push("/admin/buttons")
            })
        } catch(e){
            console.log(e)
        }
    }

    return (

        <Layout title="Создание новых кнопок" user={props.user}>
            <div className="h2">
                <h2>Добавить кнопки</h2>
            </div>
            <div className="info_content">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    addButtons()
                }}>
                    <div className="info_field">
                        <span>Название</span>
                        <input type="text" required onChange={e => {
                            setName(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Кнопка входа</span>
                        <input type="text" required onChange={e => {
                            setBtnLog(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Кнопка регистрации</span>
                        <input type="text" required onChange={e => {
                            setBtnReg(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Кнопка скачать</span>
                        <input type="text" required onChange={e => {
                            setBtnDownload(e.target.value)
                        }} />
                    </div>
                    <div className="info_field">
                        <span>Кнопка промо</span>
                        <input type="text" required onChange={e => {
                            setBtnPromo(e.target.value)
                        }} />
                    </div>
                    <button type="submit" className="buttonAdmin">Создать кнопки</button>
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