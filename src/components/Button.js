const Button = (props) => {

    const ampLink = `tap:AMP.navigateTo(url='${props.link}&split=${props.split}')`
    const areaLabel = props.areaLabel ? props.areaLabel : ''
    const btnClass = props.buttonStyle ? props.buttonStyle : ''

    return(

        props.amp ? (
            <button className={btnClass} name={areaLabel} on={ampLink}> {props.text}
            </button>
        ) : (
            <button className={btnClass} data-split={props.split} name={areaLabel}>{ props.text ? props.text : ''}</button>  
        )

    )

}

export default Button 

