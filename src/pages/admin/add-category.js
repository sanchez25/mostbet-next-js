import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import React, { use } from "react"
import axios from 'axios'
import { useRouter } from "next/router"

export default function Category(props) {

const [title, setTitle] = React.useState('')
const [slug, setSlug] = React.useState('')
const [attr, setAttr] = React.useState('')
const [flag, setFlag] = React.useState('')

const router = useRouter()

const addCategory = async () => {
    try{
        await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/add-category`, {
            title, slug, attr, flag
        }).then(() => {
            console.log('success')
            return router.push("/admin/categories")
        })
    } catch(e){
        console.log(e)
    }
}

const flags_data = JSON.parse(props.flags)

  return (
   <Layout title="Создание нового языка" user={props.user}>
        <div className="h2">
            <h2>Добавить язык</h2>
        </div>
        <div className="info_content">
            <form onSubmit={ (e) => {
                e.preventDefault()
                addCategory()
                }}>
                <div className="info_field">
                    <span>Название</span>
                    <input type="text" required onChange={e => {
                        setTitle(e.target.value)
                    }} />
                </div>
                <div className="info_field">
                    <span>Slug</span>
                    <input type="text" required onChange={e => {
                        setSlug( e.target.value )
                    }}/>
                </div>
                <div className="info_field">
                    <span>Attr</span>
                    <input type="text" required onChange={e => {
                        setAttr(e.target.value)
                    }} />
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
                <button type="submit" className="buttonAdmin">Создать категорию</button>
            </form>
        </div>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {

        let flags = []
         
        await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/flags-list`).then(
          (response) => {
            flags = JSON.stringify(response.data.flags)
          }
        )
    
        let user = req.session.user || null
  
        return {
            props: { 
                user: user,
                flags: flags
            }
        }
    }
  )