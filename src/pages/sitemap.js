import axios from "axios"
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'
import Link from "next/link"
import getCSS from "../../helpers/generateCSS"
import Head from "next/head"

const prisma = new PrismaClient()

export const config = { amp: 'hybrid' }

const Sitemap = (props) => {
   
    const isAmp = useAmp()
 
    return (
       <>
        <Head>
            <title>Sitemap</title>
        </Head>
        <div id="scroll"></div>
          
          <div className="contentMapWrap">
             <div className="contentMap">
                <h1>Sitemap</h1>
            
                <div className="sitemapLinks">
                { props.posts.map(postItem =>(
                    <>
                        <Link href={postItem.slug}>
                            {postItem.title}
                        </Link>
                    </>
                    )) 
                }
                </div>

             </div>
 
          </div>
       </>
    )
 }
 
 export default Sitemap;

 export const getServerSideProps = async ({req, res}) => {

        const options = await axios
            .get(`${process.env.NEXT_PUBLIC_HOST}/api/get-options`)
            .then( (response) => {
            return response.data.options_data
        })

        const posts = await prisma.post.findMany() || null

        const style = getCSS()

        return {
            props: { 
             posts: posts,
             options_obj: options,
             ampStyle: style
            }
        }

        
    }