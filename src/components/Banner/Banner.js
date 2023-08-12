import Button from "../Button"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"
import ImageWrap from "../ImageWrap"

export default function Banner(){

    const context = useContext({...PageContext})

    const {amp, mainLink, post, banner} = context

    return (

    <div className="banner">
      <div className="bannerInner">
          <div className="bannerText">
            <span className="mainText">{banner.title}</span>
            <p className="shadow">{banner.description}</p>
            <Button
                text={banner.text_btn}
                amp={amp}
                link={mainLink}
                areaLabel="Giriş"
                split="buttonBanner"
                buttonStyle={`btn-banner-${post.page_key} banner-btn`}
            />
          </div>
          <div className="bannerImg">
              <ImageWrap imgsrc="/uploads/img/banner-img.png.webp" imgwidth={528} imgheight={325} imgalt="banner" />
          </div>
      </div>
    </div>
    )

}