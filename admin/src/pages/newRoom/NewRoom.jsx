import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";

import useUpload from "../../hooks/useUpload";
import { uploadData } from '../../components/api'

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelid, setHotelid] = useState(undefined);
  const [rooms, setRooms] = useState('');

  const [file, setFile] = useState('');//add
  const [files, setFiles] = useState('');//add
  const { arrayUrl, getUrlArray, progress } = useUpload(file)
  const [images, setImages] = useState('');//add

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    // try{const res = await $api.post(`/rooms/${hotelid}`, { ...info, roomNumbers });} catch (err) {console.log(err);}
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    if(files && hotelid){
    const filesAll = Array.from(files);
    getUrlArray(filesAll, 'rooms')
    }
  }
  useEffect(() => {
    const roomNumbers = rooms?.split(",").map((room) => ({ number: room }));
    const newRoom = { ...info, hotelid, photos: arrayUrl, roomNumbers };
    uploadData(newRoom, `rooms/${hotelid}`)
  }, [arrayUrl])

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">

          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />

            {progress != null && progress < 100 && <div className="progress">
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
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelid(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                </select>
              </div>
              <button onClick={handleClick2}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
