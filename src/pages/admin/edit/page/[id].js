import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import React, { use, useEffect } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import { FAQ } from "@/plugins/faq/Faq"
import { Toc } from "@/plugins/toc/Toc"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import { Button } from "@/plugins/button/Button"

const prisma = new PrismaClient()
const MySwal = withReactContent(Swal)

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
                console.log(`Editor.js is ready to work on ${process.env.NEXT_PUBLIC_HOST}!`)
                
                let content = JSON.parse(props.post.content)
                props.post.content ? editor.render(content) : ''
                props.post.content ? Toc.saveData(content.blocks.find(obj => {
                    return obj.type == 'toc' || []}).data) 
                    : ''
                FAQ.init(content.blocks.find(obj => {
                    return obj.type == 'faq'
                }))
            },
            onChange: (api, event) => {
                //console.log('Now I know that Editor\'s content changed!', event)
                editor.save().then((outputData) => {
                    console.log('Article data: ', outputData)
                    let content = outputData
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

    const [title, setTitle] = React.useState(props.post.title)
    const [seoTitle, setSeoTitle] = React.useState(props.post.seo_title)
    const [shortTitle, setShortTitle] = React.useState(props.post.shortTitle)
    const [seoDescription, setSeoDescription] = React.useState(props.post.seo_description)
    const [content, setContent] = React.useState(props.post.content)
    const [category, setCategory] = React.useState(parseInt(props.post.language_id))
    const [slug, setSlug] = React.useState(props.post.slug)
    const id = props.post.id

    const router = useRouter()
 
    const editPost = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/edit-post`, {
                id, title, content, category, slug, seoTitle, shortTitle, seoDescription
            }).then(() => {
                console.log('success')
                MySwal.fire({
                    title: 'Страница обновлена',
                    text: 'Спасибо за работу:)',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
            })
        } catch(e){
            console.log(e)
            MySwal.fire({
                title: 'Страница не обновлена:(',
                text: 'Обратитесь к ближайшему доступному прогеру',
                icon: 'error',
                confirmButtonText: 'OK'
              })
         }
    }

    const deletePost = async () => {

        MySwal.fire({
            title: 'Точно хотите удалить статью?',
            showDenyButton: true,
            confirmButtonText: 'Точно',
            denyButtonText: 'Не хочу',
          }).then(async (result) => {
           
            if (result.isConfirmed) {
                try{
                    await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/delete-post`, {
                        id
                    }).then(() => {
                        console.log('Page successfully deleted!')
                        return router.push("/admin/pages")
                    })
                } catch(e){
                    console.log(e)
                }
            } else if (result.isDenied) {
              return false
            }
        })
    }

    function changeHandler(e) {
        setSeoTitle(e.target.value)
        setShortTitle(e.target.value)
    }

    return (
        <Layout title="Редактирование страницы" user={props.user}>
                <div className="h2">
                    <h2>Редактирование страницы</h2>
                </div>
                <div className="info_content">
                    <form>
                        <div className="info_field">
                            <span>Title</span>
                            <input type="text" required 
                                defaultValue={props.post.seo_title} 
                                onChange={e => {
                                    setSeoTitle(e.target.value)
                                }} 
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
                                defaultValue={props.post.seo_description} 
                                onChange={e => {
                                    setSeoDescription(e.target.value)
                                }} 
                            />
                        </div>
                        <div className="info_field">
                            <span>H1</span>
                            <input type="text" required 
                                defaultValue={props.post.title} 
                                onChange={e => {
                                    setTitle(e.target.value)
                                    setSlug( transliterate(e.target.value).toLowerCase() )
                                }} 
                            />
                        </div>
                        <div id="editorjs"></div>
                        <div className="info_field">
                            <span>Url</span>
                            <input 
                                type="text" 
                                defaultValue={props.post.slug} 
                                required onChange={e => {
                                setSlug( e.target.value )
                            }}/>
                        </div>
                        <div className="info_field">
                            <span>Категория</span>
                            <select onChange={e => setCategory( parseInt(e.target.value))} required>
                                <option defaultValue={props.current_cat.id}>{props.current_cat.title}</option>
                                { props.categories.map(cat =>(
                                    <option value={cat.id}>{cat.title}</option>
                                    )) 
                                }
                            </select>
                        </div>
                        <div className="buttonsParent"> 
                           <button className="buttonAdmin" 
                                onClick={ (e) => {
                                    e.preventDefault()
                                    editPost()
                                }}>
                                <span class="material-icons">save</span> Сохранить
                            </button>
                           <button className="buttonDelete" onClick={ (e) => {
                                    e.preventDefault()
                                    deletePost()
                                }}>
                                <span class="material-icons">delete</span> Удалить страницу
                            </button>
                        </div>
                    </form>
                </div>
        </Layout>
        )
    }

    export const getServerSideProps = withSessionSsr(
        
        async ({req, res, params}) => {
        
            let user = req.session.user || null

            const post = await prisma.post.findUnique({
                where: {
                  id: parseInt(params.id),
                },
            })

            const categories = await prisma.lang.findMany() || null

            const current_cat = await prisma.lang.findUnique({
                where: {
                  id: parseInt(post.language_id),
                },
            })
    
            return {
                props: { 
                    user: user,
                    categories: categories,
                    post: JSON.parse(JSON.stringify(post)),
                    current_cat: current_cat
                }
            }
        }
    )