import Image from "next/image"
import Button from "../Button"
import Menu from "../Menu"
import Link from "next/link"
import MobileMenu from "../MobileMenu/MobileMenu"
import ImageWrap from "../ImageWrap"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"
import Download from "./Download";
import LangSwitcher from "./LangSwitcher";

const Header = () =>  {

    const context = useContext({...PageContext})

    const {amp, mainLink, mainID, menu, post, langs, category, mainLang, buttons} = context

    const ampPostfix = amp ? '/amp' : ''

    let logoLink = category.id
    if (logoLink == mainLang) {
        logoLink = '/'
    } else {
        logoLink = category.slug
    }

        return (
            <header className="header">
                <div className="headerTop">
                    <div className="headerTopLinks">
                        <Download text={buttons.btn_download} />
                        <Button areaLabel="access" buttonStyle={`btn-navbar-${post.page_key} access-btn`} amp={amp} link={mainLink} />
                        <div className="langChoose">
                            <LangSwitcher langs={langs} amp={amp} />
                        </div>
                        <Button text={buttons.btn_promo} areaLabel={buttons.btn_promo} buttonStyle={`btn-bonus-${post.page_key} promo-btn`} amp={amp} link={mainLink} />
                    </div>
                    <div className="buttons">
                        <Button text={buttons.btn_log} areaLabel={buttons.btn_log} buttonStyle={`btn-login-${post.page_key} logButton`} amp={amp} link={mainLink} split="buttonLog"/>
                        <Button text={buttons.btn_reg} areaLabel={buttons.btn_reg} buttonStyle={`btn-signup-${post.page_key} regButton`} amp={amp} link={mainLink} split="buttonReg"/>
                    </div>
                </div>
                <div className="headerBottom">
                    <div className="headerBottomLogo">
                        { amp
                            ? <div className="ampLogo">
                                <Button amp={amp} areaLabel="logo" buttonStyle="logoButton" link={mainLink} split="logo" />
                                <ImageWrap imgsrc="/mostbet-logo.png" imgalt="Logo Mostbet" imgwidth={236} imgheight={40}></ImageWrap>
                            </div>
                            : <Link href={logoLink + ampPostfix}>
                                <ImageWrap imgsrc="/mostbet-logo.png" imgalt="Logo Mostbet" imgwidth={236} imgheight={40}></ImageWrap>
                            </Link>
                        }
                    </div>

                    <Menu mainLang={mainLang} category={category} list={menu} amp={amp} mainID={mainID} />
                    <div className="langChoose mobile">
                        <LangSwitcher mainLang={mainLang} langs={langs} amp={amp} />
                    </div>
                    <MobileMenu mainLang={mainLang} category={category} list={menu} post={post} amp={amp} link={mainLink} />
                </div>
            </header> 
        )    
    }

export default Header;