import generate from "../../helpers/generateData"
import Container from "@/components/Container"
import { useAmp } from "next/amp"

export const config = { unstable_runtimeJS: false }

export async function getStaticProps({params}){

   const generatedProps = await generate(false, params.slug)

   if (!generatedProps.post) {
      return { notFound: true }
   }

   return {
      props: generatedProps
   }

}

export async function getStaticPaths() {

   const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get-post-slugs`,{
      method:'GET',
      headers:{
         'Content-Type':'application/json'
      }
   })

   const data = await response.json()

   const pathsData = data.data.map( item => {
      return {
         params: { slug: `${item.slug}`}
      }
    })

   return {
      paths: pathsData,
      fallback: false,
   }
 }

const Page = (props) => {
   
   const propsClone = {...props}
   propsClone.breadcrumbs = false
   propsClone.amp = useAmp()
   propsClone.link = `${process.env.NEXT_PUBLIC_HOST}/${props.post.slug}`

   return (
      <Container {...propsClone} />
   )
}

export default Page