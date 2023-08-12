import generate from "../../helpers/generateData"
import Container from "@/components/Container"

export const config = { unstable_runtimeJS: false }

export const getStaticPaths = async () => {
   return {
     paths: [
       { params: { slug: [''], amp: false } }
     ],
     fallback: false
   }
 }

export async function getStaticProps({params}){

   const generatedProps = await generate(false)
   
   return {
      props: generatedProps
   }

}

const Home = (props) => {

   const propsClone = {...props}
   propsClone.breadcrumbs = false
   propsClone.link = process.env.NEXT_PUBLIC_HOST

   return (
      <>
         <Container {...propsClone}/>
      </>
   )
}

export default Home