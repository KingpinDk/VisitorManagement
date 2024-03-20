import Webcam from "react-webcam";
import { useRef , useState, useCallback} from "react";
import axios from "axios";

function CustomWebcam (){

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const retake = () => {
        setImgSrc(null);
      };

    //dk function to capture 
    const capture = useCallback(() => {
        
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef]);


      // Function to handle image upload
  const uploadImage = async () => {
    try {
      // Convert image to blob
      const response = await fetch(imgSrc);
      const blob = await response.blob();

      // Create FormData object and append the image
      const formData = new FormData();
      formData.append("image", blob);

      // Send the FormData object to the server
      const uploadResponse = await axios.post("http://localhost/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Image uploaded successfully:", uploadResponse.data);

      // Clear the image source after successful upload
      setImgSrc(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
    return (
        
      <div>
        <div className="container d-flex justify-content-center">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={300} width={300} ref={webcamRef} screenshotFormat="image/jpeg"
        screenshotQuality={0.8}/>
      )}</div>
      <div className="btn-container">
        {imgSrc ? (<button className="p-2 m-2" onClick={retake}>Retake photo</button>):

<button onClick={capture}>Capture photo</button>
        }
      {imgSrc && (
          <button className="p-2 m-2" onClick={uploadImage}>
            Upload Image
          </button>
        )}  
      </div>
      </div>
    
    );
  };
  
  export default CustomWebcam;