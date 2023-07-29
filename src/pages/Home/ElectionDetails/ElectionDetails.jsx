import React, { useEffect, useState } from 'react';
import  Modal  from 'react-modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Navbar from '../../../components/Navbar';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { Button } from '@mui/material';
import ".//index.scss";

function ElectionDetails() {

  Modal.setAppElement('#root');

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [electionDetails, setElectionDetails] = useState(null);
  const [votersStatus, setVotersStatus] = useState(0);
  const [votedUsersCount, setVotedUsersCount] = useState(0);

  useEffect(() => {
    const electionRef = doc(db, 'Election_Data', id);

    const unsubscribe = onSnapshot(electionRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setElectionDetails({ ...data, votersStatus: 0 });
      } else {
        console.log('No such document!');
      }
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const votersRef = collection(db, 'Test_User');
    const permsQuery = query(votersRef, where('perms', '==', true));
    const votedQuery = query(votersRef, where('perms', '==', true), where(id, '==', 1));

    const unsubscribePerms = onSnapshot(permsQuery, (querySnapshot) => {
      setVotersStatus(querySnapshot.size);
    });

    const unsubscribeVoted = onSnapshot(votedQuery, (querySnapshot) => {
      setVotedUsersCount(querySnapshot.size);
    });

    return () => {
      unsubscribePerms();
      unsubscribeVoted();
    };
  }, [id]);


  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const DialogueMaker =  () => {
    return (
    <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {electionDetails && `Publish ${electionDetails.Name}'s result?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clicking yes, the result and vote count will be available to public... 
            Publish? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>No</Button>
          <Button onClick={closeDialog} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const renderTableBody = () => {
    if (electionDetails) {
      return (
        <tbody>
          <tr>
            <th>Election Name:</th>
            <td>{electionDetails.Name}</td>
          </tr>
          <tr>
            <th>Election Date:</th>
            <td>{electionDetails.Date}</td>
          </tr>
          <tr>
            <th>Election Time:</th>
            <td>{electionDetails.startTime + ':00:00 - ' + electionDetails.endTime + ':00:00'}</td>
          </tr>
          <tr>
            <th>Contestant 1:</th>
            <td>{electionDetails.Contestant1}</td>
          </tr>
          <tr>
            <th>Contestant 2:</th>
            <td>{electionDetails.Contestant2}</td>
          </tr>
          <tr>
            <th>Eligible Voters:</th>
            <td>{votersStatus}</td>
          </tr>
          <tr>
            <th>Voted Users:</th>
            <td>{votedUsersCount}</td>
          </tr>
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <th>Loading...</th>
          </tr>
        </tbody>
      );
    }
  };

  return (
    <div>
      <div className='container'>
        <Navbar />
        <div className="electiondetails">
          <table className='tablee'>
            <thead>
              <tr>
                <th className='head' colSpan={2}><h1>Election Status</h1></th>
              </tr>
            </thead>
            {renderTableBody()}
          </table>
          <button className='btn pub' onClick={openDialog}>Publish </button>
          {DialogueMaker()}
        </div>
      </div>
    </div>
  );
}

export default ElectionDetails;