import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default function Banners(props) {

    return (

        <Layout title="Список баннеров" user={props.user} banners={props.banners}>
            <div className="h2">
                <h2>Список баннеров</h2>
            </div>
            <div className="pages_list">
                { props.banners.map(banner =>(
                    <div className="pages_item" key={banner.id}>
                        <h3>{ banner.name }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/banner/${banner.id}`} className="details">
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
        let banners = await prisma.banner.findMany() || null

        return {
            props: {
                user: user,
                banners: banners
            }
        }
    }
)