import { useState, useEffect } from "react";
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const useUpload = (file) => {
  const [fileUrl, setFileUrl] = useState([]);
  const [progress, setProgress] = useState(null)
  //const [preFileUrl, setPreFileUrl] = useState([])
  const [arrayUrl, setArrayUrl] = useState([])

  const getUrl = async (file, path) => {
    const storageRef = ref(storage, 'images/' + file.name);
    //const storageRef = ref(storage, filePath + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        //console.log(progress);
        switch (snapshot.state) {
          case "paused": console.log('paused'); break;
          case 'running': console.log(progress); break;
          default: break;
        }
      }, (error) => { console.log(error); alert(error)},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL)
        });
      }
    )
  }

  const getUrlArray = async (files, path) => {
    const preFileUrl = [];
    files.forEach((file) => {
      const storageRef = ref(storage, `images/${path}/` + file.name);
      //const storageRef = ref(storage, filePath + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          switch (snapshot.state) {
            case "paused": console.log('paused'); break;
            case 'running': console.log(progress); break;
            default: break;
          }
        }, (error) => { console.log(error); alert(error)},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            preFileUrl.push(downloadURL)
            if(preFileUrl.length == files.length){setArrayUrl(preFileUrl)}
          });
        }
      )
    })
  }

  return { getUrl, fileUrl, progress, getUrlArray, arrayUrl };
};

export default useUpload;
