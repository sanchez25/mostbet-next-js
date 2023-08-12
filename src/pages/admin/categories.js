import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default function Categories(props) {
  return (
   <Layout title="Список языков" user={props.user} cats={props.cats}>
        <div className="h2">
            <h2>Языки</h2>
        </div>
        <div className="pages_list">
                { props.cats.map(cat =>(
                    <div className="pages_item" key={cat.id}>
                        <img src={`/uploads/img/flags/${cat.flag}`} alt="" width="40" />
                        <h3>{ cat.title }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/category/${cat.id}`} className="details">
                                <span class="material-icons">edit</span> редактировать</Link>
                        </div> 
                    </div>
                    )) 
                }
        </div>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {
    
        let user = req.session.user || null
        let cats = await prisma.lang.findMany() || null
  
        return {
            props: { 
                user: user, 
                cats: cats 
            }
        }
    }
  )