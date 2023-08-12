const BreadcrumbsSchema = (props) => {

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        mainEntity: []
    }

    schema.mainEntity.push({
        "@type": "ListItem",
        position: 1,
        item: {
            "@id": `${props.link}`,
            name: props.title
        }
    })

    return(
        <script dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} type="application/ld+json"></script>
    )
}

export default BreadcrumbsSchema