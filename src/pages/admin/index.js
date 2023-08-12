import Layout from "../../components/admin/Layout"
import Link from "next/link"
import { withSessionSsr } from '@/lib/config/withSession'

export default function Admin({user}) {

  return (
   <Layout title="Главная админки" user={user}>
      <h2>Welcome to ADMIN PANEL</h2>
        
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
  async ({req, res}) => {
      let user = req.session.user || null 

      return {
          props: { user }
      }
  }
)