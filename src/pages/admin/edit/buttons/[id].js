import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import React, { useState } from "react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

export default function editButtons(props) {

    const [name, setName] = React.useState(props.editButtons.name)
    const [btn_log, setBtnLog] = React.useState(props.editButtons.btn_log)
    const [btn_reg, setBtnReg] = React.useState(props.editButtons.btn_reg)
    const [btn_download, setBtnDownload] = React.useState(props.editButtons.btn_download)
    const [btn_promo, setBtnPromo] = React.useState(props.editButtons.btn_promo)

    const id = props.editButtons.id

    const router = useRouter()

    const editButtons = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/edit-buttons`, {
                id, name, btn_log, btn_reg, btn_download, btn_promo
            }).then(() => {
                console.log('Banner successfully edited!')
                return router.push("/admin/buttons")
            })
        } catch(e){
            console.log(e)
        }
    }

    const deleteButtons = async () => {

        MySwal.fire({
            title: 'Точно хотите удалить кнопки?',
            showDenyButton: true,
            confirmButtonText: 'Точно',
            denyButtonText: 'Не хочу',
        }).then(async (result) => {

            if (result.isConfirmed) {
                try{
                    await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/delete-buttons`, {
                        id
                    }).then(() => {
                        console.log('Category successfully deleted!')
                        return router.push("/admin/buttons")
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

        <Layout title="Редактирование кнопок" user={props.user}>
            <div className="h2">
                <h2>Редактирование: {props.editButtons.name}</h2>
            </div>
            <div className="info_content">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    editButtons()
                }}>
                    <div className="info_field">
                        <span>Название</span>
                        <input
                            type="text"
                            defaultValue={props.editButtons.name}
                            onChange={e => {setName(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Кнопка входа</span>
                        <input
                            type="text"
                            defaultValue={props.editButtons.btn_log}
                            onChange={e => {setBtnLog( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Кнопка регистрации</span>
                        <input
                            type="text"
                            defaultValue={props.editButtons.btn_reg}
                            onChange={e => {setBtnReg( e.target.value )}}
                        />
                    </div>
                    <div className="info_field">
                        <span>Кнопка скачать</span>
                        <input
                            type="text"
                            defaultValue={props.editButtons.btn_download}
                            onChange={e => {setBtnDownload( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Кнопка промо</span>
                        <input
                            type="text"
                            defaultValue={props.editButtons.btn_promo}
                            onChange={e => {setBtnPromo( e.target.value )}}
                            required
                        />
                    </div>
                    <button type="submit" className="buttonAdmin">Сохранить кнопки</button>
                </form>
                <button onClick={deleteButtons} className="buttonDelete">Удалить кнопки</button>
            </div>
        </Layout>
    )
}

export const getServerSideProps = withSessionSsr(

    async ({req, res, params}) => {

        const prisma = new PrismaClient()

        let user = req.session.user || null

        const editButtons = await prisma.buttons.findUnique({
            where: {
                id: parseInt(params.id),
            },
        })

        return {
            props: {
                user: user,
                editButtons: editButtons
            }
        }
    }
)