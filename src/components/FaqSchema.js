export default function FaqSchema({ faq }) {

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: []
    }

    for (let item of faq) {
        schema.mainEntity.push({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer
            }
        })
    }

    return(
        <script dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} type="application/ld+json">
        </script>
    )
}