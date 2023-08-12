import Button from "../Button";
import ImageWrap from "../ImageWrap"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

const ContentSidebar = () =>  {

    const context = useContext({...PageContext})
    const {amp, mainLink, post, sidebar} = context

    const brandClick = function(){
        location.href=`${mainLink}`
    }

    const ampLink = `tap:AMP.navigateTo(url='${mainLink}')`

    return (
        <div className="contentSidebar">
            <div className="contentSidebarTop">
                <div className="sidebarTopBonus">
                    <div className="sidebarTopBorder">
                        <span className="sidebarBorderTitle">{sidebar.banner_title}</span>
                        <span className="sidebarBorderBonus">{sidebar.banner_price}</span>
                        <Button
                            amp={amp}
                            link={mainLink}
                            text={sidebar.text_btn}
                            areaLabel={sidebar.text_btn}
                            buttonStyle={`btn-sidebar-left-${post.page_key} btn-sidebar`}/>
                    </div>
                </div>
                <div className="SidebarTopItems">
                    <Button
                        amp={amp}
                        link={mainLink}
                        text={sidebar.top_one}
                        areaLabel={sidebar.top_one}
                        buttonStyle={`btn-sidebar-left-${post.page_key} btn-item`}/>
                    <Button
                        amp={amp}
                        link={mainLink}
                        text={sidebar.top_two}
                        areaLabel={sidebar.top_two}
                        buttonStyle={`btn-sidebar-left-${post.page_key} btn-item`}/>
                    <Button
                        amp={amp}
                        link={mainLink}
                        text={sidebar.top_three}
                        areaLabel={sidebar.top_three}
                        buttonStyle={`btn-sidebar-left-${post.page_key} btn-item`}/>
                </div>
            </div>
            <div className="contentSidebarBottom">
                <Button
                    amp={amp}
                    link={mainLink}
                    text={sidebar.bottom_one}
                    areaLabel={sidebar.bottom_one}
                    buttonStyle={`btn-sidebar-left-${post.page_key} btn-item`}/>
                <Button
                    amp={amp}
                    link={mainLink}
                    text={sidebar.bottom_two}
                    areaLabel={sidebar.bottom_two}
                    buttonStyle={`btn-sidebar-left-${post.page_key} btn-item`}/>
                <Button
                    amp={amp}
                    link={mainLink}
                    text={sidebar.bottom_three}
                    areaLabel={sidebar.bottom_three}
                    buttonStyle={`btn-sidebar-left-${post.page_key} btn-item`}/>
                <Button
                    amp={amp}
                    link={mainLink}
                    text={sidebar.bottom_four}
                    areaLabel={sidebar.bottom_four}
                    buttonStyle={`btn-sidebar-left-${post.page_key} btn-item`}/>
                <Button
                    amp={amp}
                    link={mainLink}
                    text={sidebar.bottom_five}
                    areaLabel={sidebar.bottom_five}
                    buttonStyle={`btn-sidebar-left-${post.page_key} btn-item`}/>
            </div>
        </div>
    )

}

export default ContentSidebar;