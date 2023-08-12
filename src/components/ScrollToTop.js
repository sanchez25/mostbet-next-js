import Image from "next/image";
import {useEffect, useRef} from 'react'

const ScrollToTop = (props) => {

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const buttonRef = useRef()

    const handleClick = () => {
        if ( buttonRef ) {
            if ( window.scrollY > 1000) {
                buttonRef.current.style.opacity = '1';
            } else {
                buttonRef.current.style.opacity = '0';
            }
        } 
    }


    useEffect( () => {
    
        window.addEventListener('scroll', handleClick);

        return () => {
            window.removeEventListener('scroll', handleClick);
        }

    }, [])

    const ampScroll = `tap:scroll.scrollTo(duration=200)`

    return (
        props.amp ? (
            <div className="scrollTop pam_content" role="button" tabIndex="0" on={ampScroll}>
                <amp-img src="/up-arrow.svg" width={13} height={13} alt="scroll to top"></amp-img>
            </div>
        ) : (
            <div className="scrollTop" role="button" tabIndex="0" onClick={scrollTop} ref={buttonRef}>
                <Image src="/up-arrow.svg" width={13} height={13} alt="scroll to top" />
            </div>
        )
    )
}

export default ScrollToTop;