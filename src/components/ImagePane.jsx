import './Home.css'

const ImagePane = ({ imageLink }) => {
    return(
        <>
            <img src={imageLink} className="imageDisplay" alt='enter an address to preview' />
        </>
    )
}

export default ImagePane;