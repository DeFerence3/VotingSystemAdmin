import React from 'react'
import Navbar from '../../components/Navbar'

function NewElection() {

  const newElectionCreatorForm = () => {
    return (
      <form>
        <label>Enter your name:
          <input type="text" />
        </label>
      </form>
    );
  }
  return (
    <div>
        <Navbar/>
        {newElectionCreatorForm()}
    </div>
  )
}

export default NewElection