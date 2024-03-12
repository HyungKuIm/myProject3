function PhotoText({image, label}) {
    return (
        <div>
            <img src={image} alt="" width="400"/>
            <span>{label}</span>
        </div>
    );
}

export default PhotoText;