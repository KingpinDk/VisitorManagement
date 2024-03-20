import React, { useState, useEffect , useCallback, useRef} from 'react';
import axios from 'axios';
import Webcam from "react-webcam";

const Watchin = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [headcount, setHeadcount] = useState('');
  const [department, setDepartment] = useState('');
  const [staff, setStaff] = useState('');
  const [reason, setReason] = useState('');
  const [staffList, setStaffList] = useState([]);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  //const [error, setError] = useState(null);
  // const [stream, setStream] = useState(null);
  // let video;

  const CustomWebcam =()=>{

    

    const retake = () => {
        setImgSrc(null);
      };

    //dk function to capture 
    const capture = useCallback(() => {
        
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef]);



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
      </div>
      </div>
    
    );
  };

  // Fetch staff names based on department
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        console.log("department in fetch", department);
        const response = await axios.post('http://localhost:8000/staff', { department });
        setStaffList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, [department]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to server along with the picture
      const resp = await fetch(imgSrc);
      const picture = await resp.blob();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('headcount', headcount);
      formData.append('department', department);
      formData.append('staff', staff);
      formData.append('reason', reason);
      formData.append('picture', picture);

      const response = await axios.post('http://localhost:8000/approval', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Form submitted successfully:', response.data);
      
      // Clear form inputs after successful submission
      setName('');
      setPhone('');
      setHeadcount('');
      setDepartment('');
      setStaff('');
      setReason('');
      setImgSrc(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  // Function to stop capturing from webcam

  return (
    <div className="form-container">
      <h2>Enter Personal Information</h2>
      <CustomWebcam></CustomWebcam>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Phone No:</label>
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>Headcount</label>
        <input type="text" value={headcount} onChange={(e) => setHeadcount(e.target.value)} required />

        <label>Department:</label>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>

        <label>Staff Name:</label>
        <select value={staff} onChange={(e) => setStaff(e.target.value)} required>
          <option value="">Select Staff</option>
          {staffList.map((staffName, index) => (
            <option key={index} value={staffName}>{staffName}</option>
          ))}
        </select>

        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Watchin;
