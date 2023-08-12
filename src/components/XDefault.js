
const XDefault = (props) => {

    let link = props.slug == '/' ? `${process.env.NEXT_PUBLIC_HOST}/` : `${process.env.NEXT_PUBLIC_HOST}/${props.slug}`

    console.log("Slug", props.slug)

    return (
        <>
            <link rel="alternate" hrefLang="x-default" href={link} />
        </>
    )

}

export default XDefault