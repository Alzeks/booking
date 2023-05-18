import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { userInputs } from '../../formSource'
import { userColumns } from '../../datatablesource'

import useUpload from '../../hooks/useUpload'
import Datatable from "../../components/datatable/Datatable";
import {uploadData} from '../../components/api'
import  axios  from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loadingImg, setLoadingImg] = useState(true)
  const { fileUrl, getUrl, progress } = useUpload(file)
  const [error, setError] = useState('') //MY

  const handlAdd = (e) => {
    e.preventDefault();
    if (file) {getUrl(file, 'users')} 
  }
  const fetchData = async () => {
    await axios.post(`http://localhost:8800/api/users`,  {withCredentials: true}
    ).then((data) => {console.log(data)  })
    };
    fetchData();
  useEffect(()=>{
    const newUser = {...info, photos: fileUrl};
    console.log(newUser);
    //uploadData(newUser, 'users')
      // const res =  axios.post(`http://localhost:8800/api/users`, newUser,  {withCredentials: true}
      // ).then((d)=>{console.log(d)});    
      const fetchData = async () => {
      await axios.post(`http://localhost:8800/api/users`, newUser,  {withCredentials: true}
      ).then((data) => {console.log(data)  })
      };
      fetchData();
}, [fileUrl])

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInfo({ ...info, [id]: value })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      // const uploadRes = await axios.post(
      //   "https://api.cloudinary.com/v1_1/lamadev/image/upload", data);
      // const { url } = uploadRes.data;
      // const newUser = { ...info, img: url };
     // await axios.post("/auth/register", newUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            {progress !== null && progress < 100 && <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <div className="progress"
                style={{ width: `${progress * 3}px`, backgroundColor: 'grey', height: '2px', borderRadius: '3px', marginLeft: '20px' }}>
                ...loading</div></div>}
                 <span style={{color: 'red'}}>{error}</span> 
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs && userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    // onChange={handleChange}
                    onChange={handleInput}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              {/* <button onClick={handleClick}>Send</button> */}
              <button onClick={handlAdd}>Send</button>
            </form>
          </div>
        </div>
        <div >{userColumns && userColumns.map((user) =><div ></div>)}</div>
      </div>
    </div>
  );
};

export default New;
