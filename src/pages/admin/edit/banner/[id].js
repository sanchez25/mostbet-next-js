import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import React, { useState } from "react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

export default function editBanner(props) {

    const [name, setName] = React.useState(props.editBanner.name)
    const [title, setTitle] = React.useState(props.editBanner.title)
    const [description, setDescription] = React.useState(props.editBanner.description)
    const [text_btn, setTextBtn] = React.useState(props.editBanner.text_btn)

    const id = props.editBanner.id

    const router = useRouter()

    const editBanner = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/edit-banner`, {
                id, name, title, description, text_btn
            }).then(() => {
                console.log('Banner successfully edited!')
                return router.push("/admin/banners")
            })
        } catch(e){
            console.log(e)
        }
    }

    const deleteBanner = async () => {

        MySwal.fire({
            title: 'Точно хотите удалить баннер?',
            showDenyButton: true,
            confirmButtonText: 'Точно',
            denyButtonText: 'Не хочу',
        }).then(async (result) => {

            if (result.isConfirmed) {
                try{
                    await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/delete-banner`, {
                        id
                    }).then(() => {
                        console.log('Category successfully deleted!')
                        return router.push("/admin/banners")
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

        <Layout title="Редактирование баннера" user={props.user}>
            <div className="h2">
                <h2>Редактирование: {props.editBanner.name}</h2>
            </div>
            <div className="info_content">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    editBanner()
                }}>
                    <div className="info_field">
                        <span>Название</span>
                        <input
                            type="text"
                            defaultValue={props.editBanner.name}
                            onChange={e => {setName(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Тайтл</span>
                        <input
                            type="text"
                            defaultValue={props.editBanner.title}
                            onChange={e => {setTitle( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Описание</span>
                        <input
                            type="text"
                            defaultValue={props.editBanner.description}
                            onChange={e => {setDescription( e.target.value )}}
                        />
                    </div>
                    <div className="info_field">
                        <span>Текст на кнопке</span>
                        <input
                            type="text"
                            defaultValue={props.editBanner.text_btn}
                            onChange={e => {setTextBtn( e.target.value )}}
                            required
                        />
                    </div>
                    <button type="submit" className="buttonAdmin">Сохранить баннер</button>
                </form>
                <button onClick={deleteBanner} className="buttonDelete">Удалить баннер</button>
            </div>
        </Layout>
    )
}

export const getServerSideProps = withSessionSsr(

    async ({req, res, params}) => {

        const prisma = new PrismaClient()

        let user = req.session.user || null

        const editBanner = await prisma.banner.findUnique({
            where: {
                id: parseInt(params.id),
            },
        })

        return {
            props: {
                user: user,
                editBanner: editBanner
            }
        }
    }
)