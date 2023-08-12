
const HrefLang = (props) => {

    let link = props.slug == '/' ? `${process.env.NEXT_PUBLIC_HOST}/` : `${process.env.NEXT_PUBLIC_HOST}/${props.slug}`

    return (
        <>
            {props.lang.includes('-') || props.lang.includes('_')
                ? <>
                    <link rel="alternate" hrefLang={props.lang.slice(0, -3)} href={link} />
                    <link rel="alternate" hrefLang={props.lang} href={link} />
                 </>
                : <link rel="alternate" hrefLang={props.lang} href={link} />
            }
        </>
    )

}

export default HrefLang