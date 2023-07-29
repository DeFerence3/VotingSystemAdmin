import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, getDocs, collection, getCountFromServer } from "firebase/firestore";
import { db } from "../../firebase";

const Login = () => {

  const adminCollection = collection(db, "Admin_User");
  const [querySnapshot, setQuerySnapshot] = useState([]);
  const [err,setErr] = useState(false);
  const [adminid, setAdminid] = useState(1);
  const numberOfAdmins = useRef(0);

  useEffect(() => {

    const fetchAdminData = async () => {

      const snapshot = await getCountFromServer(adminCollection);
      numberOfAdmins.current = snapshot.data().count;
      const docRef = doc(adminCollection, "Admin"+adminid);
      const docSnap = await getDoc(docRef);

      const querySnapshot = await getDocs(adminCollection);
      setQuerySnapshot(querySnapshot);

    };

    fetchAdminData();
  }, []);

  
  const checkUserNameAndPassword = async (adminid,username,password) => {
    
    const docRef = doc(adminCollection, "Admin"+adminid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log(docSnap.data().Username);
      console.log(docSnap.data().Password);
      
    } else {
      console.log("NO admin found");
    }
    return true;
  }
  
  const submitHandler = async (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    
    if (await checkUserNameAndPassword(adminid,username,password)) {
      setAdminid(adminid + 1)
    } 
    else {
      setErr(true);
    } 
  }
  
  const createHeader = () => {
    if (querySnapshot && querySnapshot.docs) {
      return (
        <tr>
          {querySnapshot.docs.map((doc) => (
            <th className={doc.data().Position === adminid.toString() ? 'ths foc' : 'ths'} key={doc.id}>
              {doc.data().Name}
            </th>
          ))}
        </tr>
      );
    }
    return ( 
      <tr>
       <th className="ths"> Loading... </th>
      </tr>
    );
  };

  return (
    <div className="body">
      <header className="header">
        <div className="header__content">
          <div className="header__content__lopa">
            <label to="/" className="header__content__logo">
              Voting System
            </label>
            <label>| Login</label>
          </div>
        </div>
      </header>
      <section>
        <table>
          <thead>{createHeader()}</thead>
          <tbody>
            <tr>
              <td colSpan={numberOfAdmins.current} className="btd">
                <div className="form-box">
                  <div className="form-value">
                    <form id="form" autoComplete="off" onSubmit={submitHandler}>
                      <h2>Login</h2>
                      <div className="inputbox">
                        <input name="usernmi" type="text" id="unm"  required />
                        <label htmlFor="usernmi">Username</label>
                      </div>
                      <div className="inputbox">
                        <input type="password" id="pass" required />
                        <label>Password</label>
                      </div>
                      {err && <span className='errspan'>Wrong Username or Password</span>}
                      <input
                        type="submit"
                        id="submit"
                        className="sbmBtn"
                      />
                    </form>
                    <button className="skpBtn" id="skp">
                      Skip
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Login;
