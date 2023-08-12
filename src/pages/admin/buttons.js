import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default function Buttons(props) {

    return (

        <Layout title="Список кнопок" user={props.user} buttons={props.buttons}>
            <div className="h2">
                <h2>Список кнопок</h2>
            </div>
            <div className="pages_list">
                { props.buttons.map(button =>(
                    <div className="pages_item" key={button.id}>
                        <h3>{ button.name }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/buttons/${button.id}`} className="details">
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
        let buttons = await prisma.buttons.findMany() || null

        return {
            props: {
                user: user,
                buttons: buttons
            }
        }
    }
)