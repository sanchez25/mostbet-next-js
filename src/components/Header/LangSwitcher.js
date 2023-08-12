import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"
import ImageWrap from "../ImageWrap"
import Link from "next/link"

const LangSwitcher = (props) => {

    const context = useContext({...PageContext})
    const {amp, category} = context

    console.log("Langs", props.langs)

    return (
        <>
            { amp
                ?   <div className="choose">
                        <div className="toggled" on="tap:AMP.setState({option: !option, up: !up})">
                            <ImageWrap imgsrc={`/uploads/img/flags/${category.flag}`} imgalt={category.title} imgwidth={18} imgheight={18} />
                            <span>{category.slug}</span>
                        </div>
                        <div className="submenu hide">
                                {props.langs.map(langItem =>(
                                    <>
                                        <Link
                                            href={langItem.slug}
                                            key={langItem.id}
                                        >
                                            <ImageWrap imgsrc={`/uploads/img/flags/${langItem.flag}`} imgalt={langItem.title} imgwidth={18} imgheight={18} />
                                            {langItem.slug}
                                        </Link>
                                    </>
                                    ))
                                }
                        </div>
                    </div>
                :   <div className="choose">
                        <ImageWrap imgsrc={`/uploads/img/flags/${category.flag}`} imgalt={category.title} imgwidth={18} imgheight={18} />
                        <span>{category.slug}</span>
                        <div className="submenu">
                            {props.langs.map(langItem =>(
                                <>
                                    <Link
                                        href={langItem.mainSlug}
                                        title={props.mainLang}
                                    >
                                        <ImageWrap imgsrc={`/uploads/img/flags/${langItem.flag}`} imgalt={langItem.title} imgwidth={18} imgheight={18} />
                                        {langItem.slug}
                                    </Link>
                                </>
                                ))
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default LangSwitcher