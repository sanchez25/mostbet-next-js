import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default function allMenus(props){

    return(
        <Layout title="Все меню" user={props.user}>
            <div className="h2">
                <h2>Меню</h2>
            </div>
            <div className="pages_list">
                { props.menu.map(menuItem =>(
                    <div className="pages_item" key={menuItem.id}>
                        <h3>{ menuItem.name }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/menu/${menuItem.id}`} className="details">
                                <span class="material-icons">edit</span>редактировать
                            </Link>
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
        let menu = await prisma.menu.findMany() || null
  
        return {
            props: { 
                user: user, 
                menu: menu
            }
        }
    }
  )