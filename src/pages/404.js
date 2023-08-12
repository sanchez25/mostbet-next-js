import Button from "@/components/Button"
import { useEffect, useState } from "react"
import axios from "axios"
import Head from "next/head"
import ImageWrap from "../components/ImageWrap";
import Link from "next/link";

const Error = function() {

    const [mainLink, setMainLink] = useState('')

    async function getOption(){
      await axios
         .get(`${process.env.NEXT_PUBLIC_HOST}/api/get-options`)
         .then( (response) => {
            let link = response.data.options_data.find(x => x.key === 'mainLink').value
            setMainLink(link)
            return link
      })
    }
    
   useEffect(getOption, [])

    return (
        <>
        <Head>
            <title>Not found</title>
        </Head>
        <div id="scroll"></div>
        <div className="page404">
            <div className="content404Page">
               <div className="content404">
                   <Link href={"/"}>
                    <ImageWrap imgsrc="/mostbet-logo.png" imgalt="Logo Mostbet" imgwidth={236} imgheight={40} />
                   </Link>
                   <ImageWrap imgsrc="/uploads/img/not-found.png.webp" imgalt="404" imgwidth={500} imgheight={206} />
                  <Button text="KAYIT" buttonStyle="errorBtn" amp={false} link={mainLink} split="button404"/>
               </div>
            </div>
        </div>
     </>
    )

}
  
export default Error;


