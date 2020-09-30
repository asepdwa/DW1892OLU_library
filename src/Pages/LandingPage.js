import React from 'react';
import '../Assets/App.css';
import Header from '../Component/Header';
import LpButton from '../Component/LpButton'

export default function LandingPage() {
  const containerStyle = {
    marginLeft: 40, marginTop: 100
  };

  return (
    <div className="App">
      <Header/>
      <div className="container" style={containerStyle}><br/><br/>
        <p className="quote"><i>Your</i> library<br/>
        anywhere</p>
        <p className="note">Sign-up today and receive unlimited accesss to <br/>all of your reading - share your book.</p><br/>
        <LpButton/>
        </div>
    </div>
  );
}
