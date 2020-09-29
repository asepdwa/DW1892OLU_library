import React from 'react';
import '../Assets/App.css';

import Background from '../Assets/img1.png';
import Header from '../Component/Header.js';

export default function LandingPage() {
  const divStyle = {
    position: 'fixed',
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
    minHeight: '100%',
    minWidth: 1024
  };

  const containerStyle = {
    marginLeft: 40, marginTop: 70
  };
  const btnStyle = {
    width: 200, marginRight: 10
  };

  return (
    <div style={divStyle}>
      <Header/>
      <div class="container" style={containerStyle}><br/><br/>
        <p className="quote"><i>Your</i> library<br/>
        anywhere</p>
        <p className="note">Sign-up today and receive unlimited accesss to all of <br/>your reading - share your book.</p><br/>
        <button type="button" class="btn btn-dark" style={btnStyle}>Sign Up</button>
        <button type="button" class="btn btn-light" style={btnStyle} >Sign In</button>
       
        </div>
    </div>
  );
}