import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import React, { use } from "react"
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function Category(props) {

    const [title, setTitle] = React.useState(props.category.title)
    const [slug, setSlug] = React.useState(props.category.slug)
    const [attr, setAttr] = React.useState(props.category.attr)
    const [flag, setFlag] = React.useState(props.category.flag)
    const [menu, setMenu] = React.useState(props.category.menu_id)
    const [banner, setBanner] = React.useState(props.category.banner_id)
    const [sidebar, setSidebar] = React.useState(props.category.sidebar_id)
    const [buttons, setButtons] = React.useState(props.category.buttons_id)

    const id = props.category.id
    
    const router = useRouter()

    const editCategory = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/edit-category`, {
                id, title, slug, attr, flag, menu, banner, sidebar, buttons
            }).then(() => {
                console.log('Category successfully edited!')
                return router.push("/admin/categories")
            })
        } catch(e){
            console.log(e)
        }
    }

    const deleteCategory = async () => {

        MySwal.fire({
            title: 'Точно хотите удалить язык?',
            showDenyButton: true,
            confirmButtonText: 'Точно',
            denyButtonText: 'Не хочу',
          }).then(async (result) => {
           
            if (result.isConfirmed) {
                try{
                    await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/delete-category`, {
                        id
                    }).then(() => {
                        console.log('Category successfully deleted!')
                        return router.push("/admin/categories")
                    })
                } catch(e){
                    console.log(e)
                }
            } else if (result.isDenied) {
              return false
            }
        })
    }

    const flags_data = JSON.parse(props.flags)

    return (
    <Layout title="Редактирование категории" user={props.user}>
            <div className="h2">
                <h2>Edit category: {props.category.title}</h2>
            </div>
            <div className="info_content">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    editCategory()
                    }}>
                    <div className="info_field">
                        <span>Заголовок</span>
                        <input 
                            type="text" 
                            defaultValue={props.category.title}  
                            onChange={e => {setTitle(e.target.value)}} 
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Slug</span>
                        <input 
                            type="text" 
                            defaultValue={props.category.slug} 
                            onChange={e => {setSlug( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Attr</span>
                        <input 
                            type="text" 
                            defaultValue={props.category.attr} 
                            onChange={e => {setAttr(e.target.value)}} 
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Флаг</span>
                        <div className="input">
                            <label for="flag">{flag}</label>
                        </div>
                            { 
                            flags_data.map(fl =>(
                                <>
                                    <div className="input">
                                        <label for={fl}>
                                            <input defaultValue={fl} 
                                                onChange={e => setFlag(e.target.value)} 
                                                checked={ fl == flag ? 'checked' : false }
                                                type="radio" name="flag" id={fl}/>
                                            <img src={`/uploads/img/flags/${fl}`} 
                                                width="40"
                                                alt="" />
                                            {fl}
                                        </label>
                                    </div>
                                    
                                </>
                                )) 
                            }
                    </div>
                    <div className="info_field">
                            <span>Меню в шапке</span>
                            <select onChange={e => setMenu( parseInt(e.target.value))} required>
                                <option defaultValue={props.currentMenu.id}>{props.currentMenu.name}</option>
                                { props.menuList.map(m =>(
                                    <option value={m.id}>{m.name}</option>
                                    )) 
                                }
                            </select>
                    </div>
                    <div className="info_field">
                        <span>Баннер</span>
                        <select onChange={e => setBanner( parseInt(e.target.value))} required>
                            <option defaultValue={props.currentBanner.id}>{props.currentBanner.name}</option>
                            { props.bannerList.map(m =>(
                                <option value={m.id}>{m.name}</option>
                            ))
                            }
                        </select>
                    </div>
                    <div className="info_field">
                        <span>Сайдбар</span>
                        <select onChange={e => setSidebar( parseInt(e.target.value))} required>
                            <option defaultValue={props.currentSidebar.id}>{props.currentSidebar.name}</option>
                            { props.sidebarList.map(m =>(
                                <option value={m.id}>{m.name}</option>
                            ))
                            }
                        </select>
                    </div>
                    <div className="info_field">
                        <span>Кнопки</span>
                        <select onChange={e => setButtons( parseInt(e.target.value))} required>
                            <option defaultValue={props.currentButtons.id}>{props.currentButtons.name}</option>
                            { props.buttonsList.map(m =>(
                                <option value={m.id}>{m.name}</option>
                            ))
                            }
                        </select>
                    </div>
                    <button type="submit" className="buttonAdmin">Сохранить категорию</button>
                </form>
                <button onClick={deleteCategory} className="buttonDelete">Удалить категорию</button>
            </div>
    </Layout>
    )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res, params}) => {

        const prisma = new PrismaClient()
    
        let user = req.session.user || null

        const category = await prisma.lang.findUnique({
            where: {
              id: parseInt(params.id),
            },
        })

        let flags = []
         
        await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/flags-list`).then(
          (response) => {
            flags = JSON.stringify(response.data.flags)
          }
        )

        let menu = await prisma.menu.findMany({
            select: {
              id: true,
              name: true
            }
        })

        const currentMenu = await prisma.menu.findUnique({
            where: {
              id: category.menu_id || 1
            },
            select: {
                id: true,
                name: true
            }
        })

        let banner = await prisma.banner.findMany({
            select: {
                id: true,
                name: true
            }
        })

        const currentBanner = await prisma.banner.findUnique({
            where: {
                id: category.banner_id || 1
            },
            select: {
                id: true,
                name: true
            }
        })

        let sidebar = await prisma.sidebar.findMany({
            select: {
                id: true,
                name: true
            }
        })

        const currentSidebar = await prisma.sidebar.findUnique({
            where: {
                id: category.sidebar_id || 1
            },
            select: {
                id: true,
                name: true
            }
        })

        let buttons = await prisma.buttons.findMany({
            select: {
                id: true,
                name: true
            }
        })

        const currentButtons = await prisma.buttons.findUnique({
            where: {
                id: category.buttons_id || 1
            },
            select: {
                id: true,
                name: true
            }
        })
  
        return {
            props: { 
                user: user,
                category: category,
                flags: flags,
                menuList: menu,
                currentMenu: currentMenu,
                bannerList: banner,
                currentBanner: currentBanner,
                sidebarList: sidebar,
                currentSidebar: currentSidebar,
                buttonsList: buttons,
                currentButtons: currentButtons,
            }
        }
    }
  )