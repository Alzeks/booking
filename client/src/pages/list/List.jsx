import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { faPlane } from "@fortawesome/free-solid-svg-icons";//add
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";//add

//import Input from '../../components/Input'//case input of List without render List.Look 29

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    location.state.destination ? `/hotels?city=${destination}`
      : '/hotels'
  );
  //const [destination1, setDestination1] = useState(location.state.destination);//case input of List without render List
  //const [go, setGo] = useState(true); const getMax=(max1)=>{setDestination1(max1)}//case input of List without render List
  // useEffect(()=>{reFetch(`/hotels?city=${destination1 || undefined}&min=${min || 0 }&max=${max || 999}`)
  // }, [destination1])//case input of List without render List
  const handleClick = () => {// setGo(!go);return null //case input of List without render List.Look up 29
    const newDastination = destination
    reFetch(`/hotels?city=${newDastination || undefined}&min=${min || 0}&max=${max || 999}`);
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination} type="text" />
            </div>

            {/* <div className="case input of List without render List.Look up 29" >
            <Input getMax={getMax} go={go}/>
            </div> */}

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "MM/dd/yyyy")} 
                to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              !data.length ? <div className="nofound">We have fuond nuthing.Chack correcting inputs </div> :
                <>
                  {!destination && <div style={{ display: 'flex' }}>
                    <div className="">Were are you going </div>
                    <FontAwesomeIcon className="planemooving" icon={faPlane} />
                  </div>}
                  {data.map((item) => (
                    <SearchItem item={item} key={item._id} dates={dates} />
                  ))}
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
