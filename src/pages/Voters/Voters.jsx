import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase.js';
import Navbar from '../../components/Navbar.jsx';
import ".//index.scss";

const Voters = () => {
  const [votersData, setVotersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Test_User'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().Name,
          perm: doc.data().perms,
        }));
        setVotersData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Test_User'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().Name,
        perm: doc.data().perms,
      }));
      setVotersData(data);
    });

    return () => unsubscribe();
  }, []);

  const togglePermission = (id, perm) => {
    const userRef = doc(db, 'Test_User', id);
    updateDoc(userRef, {
      perms: !perm
    });

    setVotersData((prevData) =>
      prevData.map((voter) =>
        voter.id === id ? { ...voter, perm: !voter.perm } : voter
      )
    );
  };

  const removeVoter = async (id) => {
    const desertRef = doc(db, 'Test_User', id);
    deleteDoc(desertRef)
      .then(() => {
        deleteObject(ref(storage, 'user_profile/' + id))
      })
      .catch((error) => {
        alert(error);
      });
    setVotersData((prevData) => prevData.filter((voter) => voter.id !== id));
  };

  const renderBody = () => {
    return votersData.map((voter) => (
      <tr className="trr" key={voter.id}>
        <td>{voter.id}</td>
        <td>{voter.name}</td>
        <td className="perm">
          <button
            className={`button ${voter.perm ? 'active' : 'inactive'}`}
            onClick={() => togglePermission(voter.id, voter.perm)}
          >
            {voter.perm ? 'Yes' : 'No'}
          </button>
        </td>
        <td className="operation">
          <button className="button" onClick={() => removeVoter(voter.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="tablecontainer">
        <table id="voters">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Permission</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
    </>
  );
};

export default Voters;
