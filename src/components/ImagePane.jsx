import './Home.css'

const ImagePane = ({ imageLink }) => {
    return(
        <>
            <img src={imageLink} className="imageDisplay" alt='enter an address to view' />
        </>
    )
}

export default ImagePane;