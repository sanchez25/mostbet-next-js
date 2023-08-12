import generate from "../../../helpers/generateData"
import Page from "../[[...slug]]"
export const config = { amp: true }
export default Page

export async function getServerSideProps(){

    const generatedProps = await generate(true)
   
    return {
        props: generatedProps
    }

}