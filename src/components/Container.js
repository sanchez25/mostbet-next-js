import Heading from "@/components/Heading"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Banner from "@/components/Banner/Banner"
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { PageContext } from "@/providers/PageContext"

export default function Container({...props}){

    return(
        <PageContext.Provider value={{...props}}>
            <Heading />
            <div id="scroll"></div>
            <Header/>
            <Banner/>
            <div className="content">
                <ContentSidebar />
                <div className="contentMain">
                    { props.breadcrumbs ? <Breadcrumbs /> : ''}
                    <h1 className="h1-title">{props.post.title}</h1>
                    <div className="content-block"
                        dangerouslySetInnerHTML={{__html: props.rendered}}>
                    </div>
                </div>
            </div>
            <Footer/>
        </PageContext.Provider>
    )

}