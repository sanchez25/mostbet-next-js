import ScrollToTop from "../ScrollToTop"
import Button from "../Button"
import ImageWrap from "../ImageWrap"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"
import Link from "next/link";
import Download from "../Header/Download";
import FooterProviders from "./FooterProviders";
import FooterBottom from "./FooterBottom";

let year = new Date().getFullYear()

const Footer = () =>  {

    const context = useContext({...PageContext})

    const {amp, mainLink, post, buttons} = context

    return (
        <>
            <footer className="footer">
                <div className="footerInner">
                    <div className="footerTop">
                        <Link href={"/"}>
                            <ImageWrap imgsrc="/mostbet-logo.png" imgalt="Logo Mostbet" imgwidth={236} imgheight={40}></ImageWrap>
                        </Link>
                        <div className="footerEighteen">18+</div>
                    </div>
                    <div className="footerProviders">
                        <FooterProviders />
                    </div>
                    <div className="footerDownload">
                        <Download text={buttons.btn_download} />
                    </div>
                    <FooterBottom />
                    <div className="copyright">
                        <span>© Copyright {year}</span>
                    </div>
                </div>
                <ScrollToTop amp={amp} />
            </footer>
            <div className="fixedButtons">
                <div className="buttons">
                    <Button text={buttons.btn_log} areaLabel={buttons.btn_log} buttonStyle={`btn-login-${post.page_key} logButton`} amp={amp} link={mainLink} split="buttonLog"/>
                    <Button text={buttons.btn_reg} areaLabel={buttons.btn_reg} buttonStyle={`btn-signup-${post.page_key} regButton`} amp={amp} link={mainLink} split="buttonReg"/>
                </div>
            </div>
            { amp ? '' : <script defer id="mainJS" data-link={mainLink} src="/uploads/main.js"></script>}
        </>
        
    )

}

export default Footer;
