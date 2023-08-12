import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default function Sidebars(props) {

    return (

        <Layout title="Список сайдбаров" user={props.user} sidebars={props.sidebars}>
            <div className="h2">
                <h2>Список сайдбаров</h2>
            </div>
            <div className="pages_list">
                { props.sidebars.map(sidebar =>(
                    <div className="pages_item" key={sidebar.id}>
                        <h3>{ sidebar.name }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/sidebar/${sidebar.id}`} className="details">
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
        let sidebars = await prisma.sidebar.findMany() || null

        return {
            props: {
                user: user,
                sidebars: sidebars
            }
        }
    }
)