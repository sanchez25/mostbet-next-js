import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { useState, useEffect } from "react"
import axios from "axios"

const prisma = new PrismaClient()

export default function Pages(props) {

const main_page_id = props.options.find(x => x.key === 'mainPageID').value

const changePageKey = async (id, pageKey) => {
    try{
        await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/change-page-key`, {id, pageKey})
        .then(() => {
            console.log(`successfully changed key for page ${id} with value ${pageKey}`)
        })
    } catch(e){
        console.log(e)
    }
}

  return (
   <Layout title="Список страниц" user={props.user} posts={props.posts}>
        <div className="h2">
            <h2>Страницы</h2>
        </div>
        <div className="pages_list">
                { props.posts.map(post =>(
                    <div className="pages_item" key={post.id}>
                        <h3>{ post.title } { (post.id == main_page_id) ? <span>Главная страница</span> : '' }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/page/${post.id}`} className="details">
                                <span className="material-icons">edit</span>редактировать
                            </Link>
                            <input type="text" 
                                className="pageKey"
                                defaultValue={post.page_key} 
                                onChange={ e => changePageKey(post.id, e.target.value) } 
                                placeholder="Введите page_key"
                            />
                        </div> 
                    </div>
                ))}
        </div>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {
    
        let user = req.session.user || null
        let posts = await prisma.post.findMany() || null
        let options = await prisma.options.findMany() || null
  
        return {
            props: { 
                user: user, 
                posts: JSON.parse(JSON.stringify(posts)),
                options: options
            }
        }
    }
  )