import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [electionData, setElectionData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Election_Data'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          cont1: doc.data().Contestant1,
          cont2: doc.data().Contestant2,
          cont3: doc.data().Contestant3,
          cont4: doc.data().Contestant4,
          date: doc.data().Date,
          name: doc.data().Name,
        }));
        setElectionData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const viewElectionBtnClick = (electionid) =>{
    navigate('/deatils/'+electionid);
  }

  const renderBoxes = () => {

    console.log(electionData.length)

    if(electionData.length <= 0 ){
      return <h2 className='noelection'>
        No Election Currently Going On
      </h2>
    } else{

      return (electionData.map((election) => (
        <div className="box" key={election.id}>
          <div className="inner">
            <div className="details">
                <h2>{election.name}</h2>
                <p>{election.date}</p>
              </div>
              <button className='button fit' onClick={() => viewElectionBtnClick(election.id)}> View </button>
            </div>
        </div>
      )))

    }
  }

  return (
    <>
      <Navbar/>
      <div id="main">
        <div className="inner">
          <div className="thumbnails" id="thumb">
            {renderBoxes()}
            {/* <div className="box">
              <div className="inner">
                <div className="details">
                  <h2>Panchayat Election</h2>
                  <p>26 May 2023</p>
                </div>
                <a className="button fit"  id="viewBtn" href=''>View</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home