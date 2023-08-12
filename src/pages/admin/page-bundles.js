import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import React, { useState, useEffect } from "react"
import axios from "axios"
import CustomBundle from "../../components/admin/CustomBundle";

const prisma = new PrismaClient()

export default function Pages(props) {

    const main_page_id = props.options.find(x => x.key === 'mainPageID').value

    const changeMainLangPost = async (id, mainVersionId) => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/change-main-version`, {id,mainVersionId})
                .then(() => {
                    console.log(`successfully changed key for page ${id} with value ${mainVersionId}`)
                })
        } catch(e){
            console.log(e)
        }
    }

    return (
        <Layout title="Список связок" user={props.user} posts={props.posts}>
            <div className="h2">
                <h2>Список связок</h2>
            </div>
            <div className="pages_list">
                { props.posts.map(post => {
                    let mainVersionPost = props.posts.find(p => post.mainVersion_id == p.id) || post
                    return (
                        <div className="pages_item bundles" key={post.id}>
                            <h3>{post.title} {(post.id == main_page_id) ? <span>Главная страница</span> : ''}</h3>
                            <div className="pages_item_moves">
                                <span>Основная версия страницы</span>
                                <select
                                    className="mainVersionId"
                                    onChange={e => changeMainLangPost(post.id, parseInt(e.target.value))}
                                    required>
                                    <option value={post.mainVersion_id}>{mainVersionPost.shortTitle}</option>
                                    {props.mainLangPosts.map(m => (
                                        <option value={m.id}>{m.shortTitle}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className="custom-bundle">
                                <span>Кастомная связка</span>
                            </div>
                            <div className="page-bundles">
                                <CustomBundle id={post.id} posts={props.posts} />
                            </div>
                        </div>
                    )}
                )}
            </div>
        </Layout>
    )
}

export const getServerSideProps = withSessionSsr(

    async ({req, res}) => {

        let user = req.session.user || null
        let options = await prisma.options.findMany() || null
        let posts = await prisma.post.findMany() || null
        const mainLang= parseInt(options.find(x => x.key == 'mainLang').value)

        let mainLangPosts = await prisma.post.findMany({
            where: {
                language_id: mainLang
            }
        }) || null

        return {
            props: {
                user: user,
                posts: JSON.parse(JSON.stringify(posts)),
                options: options,
                mainLangPosts: JSON.parse(JSON.stringify(mainLangPosts))
            }
        }
    }
)