import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import React, { use, useEffect } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import { FAQ } from "@/plugins/faq/Faq"
import { Toc } from "@/plugins/toc/Toc"
import { Button } from "@/plugins/button/Button"


const prisma = new PrismaClient()

export default function Pages(props) {

    useEffect(() => {
        
        const Editorjs = require('@editorjs/editorjs')
        const Header = require('@editorjs/header')
        const List = require('@editorjs/list')
        const Table = require('@editorjs/table')
        const Raw = require('@editorjs/raw')
        const ImageTool = require('@editorjs/image')
        const EditorjsColumns = require('@calumk/editorjs-columns')

        let column_tools = {
            header: Header,
        }

        const editor = new Editorjs({
           
            holder: 'editorjs',
            tools: { 
                columns : {
                    class : EditorjsColumns,
                    config : {
                      tools : column_tools
                    }
                },
                header: Header, 
                table: Table,
                raw: Raw,
                list: List,
                faq: FAQ,
                toc: Toc,
                button: Button,
                image: {
                    class: ImageTool,
                    config: {
                        uploader : {
                            async uploadByFile(file){
            
                                const data = new FormData()
                                data.append('filesData', file)
            
                                const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fileupload-post`, {
                                    method: 'POST',
                                    body: data
                                })
            
                                const res = await req.json()
            
                                return res
                            }
                        },
                        field: 'files',
                        captionPlaceholder: 'Caption | alt | title'
                    }
                }
            }, 
            onReady: () => {
                console.log('Editor.js is ready to work!')
            },
            onChange: (api, event) => {
                //console.log('Now I know that Editor\'s content changed!', event)
                editor.save().then((outputData) => {

                    let content = outputData

                    console.log('Article data: ', outputData)
                    setContent(JSON.stringify(content))
                    
                    Toc.init(content.blocks.filter(obj => {
                        return obj.type == 'header'
                    }))
                
                }).catch((error) => {
                    console.log('Saving failed: ', error)
                })
            },
            autofocus: true,
            placeholder: 'Let`s write an awesome story!',
        })
    
    }, [])

    const matches = {" ":"-","Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"Y","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"y","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

    const transliterate = (word) => {
        return word.split('').map(function (char) { 
            return matches[char] || char 
        }).join("")
    }

    const [title, setTitle] = React.useState('')
    const [shortTitle, setShortTitle] = React.useState('')
    const [seoTitle, setSeoTitle] = React.useState('')
    const [seoDescription, setSeoDescription] = React.useState('')
    const [content, setContent] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [slug, setSlug] = React.useState('')

    const router = useRouter()
 
    const addPost = async () => {
            try{
                await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/add-post`, {
                    title, content, category, slug, shortTitle
                }).then(() => {
                    console.log('success')
                    return router.push("/admin/pages")
                })
            } catch(e){
                console.log(e)
            }
        }

    function changeHandler(e) {
        setSeoTitle(e.target.value)
        setShortTitle(e.target.value)
    }

    return (
        <Layout title="Создание новой страницы" user={props.user}>
                <div className="h2">
                    <h2>Создать новую страницу</h2>
                </div>
                <div className="info_content">
                    <form onSubmit={ (e) => {
                        e.preventDefault()
                        addPost()
                    }}>
                          <div className="info_field">
                            <span>Title</span>
                            <input type="text" required 
                                /*onChange={e => {
                                    setShortTitle(e.target.value)
                                    setSeoTitle(e.target.value)
                                }} */
                                onChange={e => changeHandler(e)}
                            />
                        </div>
                        <div className="info_field">
                            <span>ShortTitle</span>
                            <input type="text" required value={shortTitle}
                                   onChange={e => {
                                       setShortTitle(e.target.value)
                                   }}
                            />
                        </div>
                        <div className="info_field">
                            <span>Description</span>
                            <input type="text" required 
                                onChange={e => {
                                    setSeoDescription(e.target.value)
                                }} 
                            />
                        </div>
                        <div className="info_field">
                            <span>H1</span>
                            <input type="text" required onChange={e => {
                                setTitle(e.target.value)
                                setSlug( transliterate(e.target.value).toLowerCase() )
                            }} />
                        </div>
                        <div id="editorjs"></div>
                        <div className="info_field">
                            <span>Url</span>
                            <input type="text" value={slug} required onChange={e => {
                                setSlug( e.target.value )
                            }}/>
                        </div>
                        <div className="info_field">
                            <span>Категория</span>
                            <select onChange={e => setCategory( parseInt(e.target.value))} required>
                                <option>Не выбрано</option>
                                { props.categories.map(cat =>(
                                    <option value={cat.id}>{cat.title}</option>
                                    )) 
                                }
                            </select>
                        </div>
                        <button className="buttonAdmin" type="submit">Создать страницу</button>
                    </form>
                </div>
        </Layout>
        )
    }

    export const getServerSideProps = withSessionSsr(
        
        async ({req, res}) => {
        
            let user = req.session.user || null

            const categories = await prisma.lang.findMany() || null
    
            return {
                props: { 
                    user: user,
                    categories: categories
                }
            }
        }
    )