import Image from "next/image";

const ImageWrap = (props) => {

    const imgClass = props.imgclass ? props.imgclass : ''
    const dimensions = {
        width: props.imgwidth,
        height: props.imgheight
    }
    const fill = { fill:true }

    return(

        props.amp ? (
            <amp-img 
                src={props.imgsrc}
                alt={props.imgalt}
                width={props.imgwidth}
                height={props.imgheight}
                className={imgClass}
            >
            
            </amp-img>
        ) : (
            <Image 
                src={props.imgsrc}
                alt={props.imgalt}
                {...(props.fill ? {...fill} : {...dimensions})}
                style={{ objectFit: 'cover' }}            
                className={imgClass}
            ></Image>
        )

    )

}

export default ImageWrap 

