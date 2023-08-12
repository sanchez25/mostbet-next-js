import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import React, { use } from "react"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'

const prisma = new PrismaClient()
const MySwal = withReactContent(Swal)

export default function Options(props) {

  const [sitename, setSitename] = React.useState(props.options.find(x => x.key === 'sitename').value)
  const [mainlink, setMainLink] = React.useState(props.options.find(x => x.key === 'mainLink').value)
  const [mainlang, setMainLang] = React.useState(props.options.find(x => x.key === 'mainLang').value)
  const [mainpage, setMainPage] = React.useState(props.options.find(x => x.key === 'mainPageID').value)

  const updateOption = async(key, value) => {
    console.log(key, value)
    try{
        await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/update-option`, {
            key, value
        }).then(() => {
            MySwal.fire({
                title: 'Опция обновлена',
                text: 'Спасибо за работу:)',
                icon: 'success',
                confirmButtonText: 'OK'
              })
            console.log(`Option ${key} successfully edited with value ${value}!`)
        })
    } catch(e){
        console.log(e)
        MySwal.fire({
            title: 'Опция не обновлена:(',
            text: 'Обратитесь к ближайшему доступному прогеру',
            icon: 'error',
            confirmButtonText: 'OK'
          })
    }
  }

  return (
   <Layout title="Опции" user={props.user}>

        <h2>Опции</h2>
        <form action="">
            <div className="info_field">
                <span>Главная страница</span>
                <select onChange={e => {
                    setMainPage( parseInt(e.target.value))
                    updateOption('mainPageID', e.target.value)
                    }} required>
                    <option 
                        key={props.mainPage.id}
                        defaultValue={props.mainPage.id}>
                        {props.mainPage.title}
                    </option>
                    { props.posts.map(post =>(
                        <option value={post.id} key={post.id}>{post.title}</option>
                        )) 
                    }
                </select>
            </div>
            <div className="info_field">
                <span>Название сайта</span>
                <input 
                    type="text" 
                    defaultValue={sitename}  
                    onChange={e => {
                        setSitename(e.target.value)
                        updateOption('sitename', e.target.value)
                    }}
                />
            </div>
            <div className="info_field">
                <span>Ссылка на рекла</span>
                <input 
                    key="2"
                    type="text" 
                    defaultValue={mainlink}
                    onChange={e => {
                        setMainLink(e.target.value)
                        updateOption('mainLink', e.target.value)
                    }}
                />
            </div>
            <div className="info_field">
                <span>Язык сайта</span>
                <select onChange={e => {
                    setMainLang( parseInt(e.target.value))
                    updateOption('mainLang', e.target.value)
                }} required>
                    <option 
                        key={props.currentLangObject.id}
                        defaultValue={props.currentLangObject.id}>
                        {props.currentLangObject.title}
                    </option>
                    { props.categories.map(cat =>(
                        <option value={cat.id} key={cat.id}>{cat.title}</option>
                        )) 
                    }
                    </select>
            </div>
        </form>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {
    
        let user = req.session.user || null

        const categories = await prisma.lang.findMany() || null
        const posts = await prisma.post.findMany() || null
        const options = await prisma.options.findMany() || null
        const currentLang = await prisma.options.findUnique({
            where: {
              key: 'mainLang',
            },
        })
        const currentPage = await prisma.options.findUnique({
            where: {
              key: 'mainPageID',
            },
        })
        const currentLangObject = await prisma.lang.findUnique({
            where: {
              id: parseInt(currentLang.value),
            },
        })
        const currentMainPageObject = await prisma.post.findUnique({
            where: {
              id: parseInt(currentPage.value),
            },
        })
  
        return {
            props: { 
                user: user,
                options: JSON.parse(JSON.stringify(options)),
                categories: categories,
                currentLangObject: currentLangObject || {},
                posts: JSON.parse(JSON.stringify(posts)),
                mainPage: JSON.parse(JSON.stringify(currentMainPageObject)) || {},
            }
        }
    }
  )