import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import useUpload from "../../hooks/useUpload";//add
import { uploadData } from '../../components/api'//add


const NewHotel = () => {
  const [files, setFiles] = useState('');
  const [file, setFile] = useState('');
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/hotels");
  const { fileUrl, getUrl, progress } = useUpload(file)

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  console.log(files)

  const handlClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", files);
          data.append("upload_preset", "upload");
          //     const uploadRes = await axios.post(
          //       "https://api.cloudinary.com/v1_1/lamadev/image/upload", 
          //      data
          //     );
          //       const { url } = uploadRes.data;
          //return url
        })
      );

      const newhotel = {
        ...info,
        //rooms,
        //photos: list,
      };

      // await axios.post("http://localhost:8800/api/hotels", newhotel)
      // .then(res => console.log(res))
    } catch (err) { console.log(err) }
  };
  const handlClick1 = async (e) => {
    e.preventDefault();
    getUrl(file, 'hotels')
  }
  useEffect(() => {
    const newHotel = { ...info, photos: fileUrl };
    console.log(newHotel);
    uploadData(newHotel, 'hotels')
  }, [fileUrl])
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* <img src='https://firebasestorage.googleapis.com/v0/b/upload-672f5.appspot.com/o/images%2FCa.PNG?alt=media&token=f3d7f88c-bf3d-4e8c-b4e8-d6d27b04931f'/> */}
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
                  multiple
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                    data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
                </select>
              </div>
              <button onClick={handlClick1}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
