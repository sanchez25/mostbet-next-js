import Button from "../Button";
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

const Download = (props) => {

    const context = useContext({...PageContext})
    const {amp, mainLink, post} = context

    return (
        <div className="headerTopDownloads">
            <span className="text-download">{props.text}</span>
            <Button areaLabel="android" buttonStyle={`btn-app-android-${post.page_key} download-android`} amp={amp} link={mainLink} />
            <Button areaLabel="apple" buttonStyle={`btn-app-ios-${post.page_key} download-ios`} amp={amp} link={mainLink} />
        </div>
    )
}

export default Download