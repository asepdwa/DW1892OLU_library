import React from 'react';
import '../Assets/App.css';

import Background from '../Assets/img1.png';
import Header from '../Component/Header.js';

export default function LandingPage() {
  return (
    <div style={{
      position: 'fixed',
      backgroundImage: `url(${Background})`,
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%',
      minHeight: '100%',
      minWidth: 1024
    }}>
      <Header/>
      <div class="container" style={{marginLeft: 40, marginTop: 50}}><br/><br/>
        <p className="quote"><i>Your</i> library<br/>
        anywhere</p>
        <p className="note">Sign-up today and receive unlimited accesss to all of <br/>your reading - share your book.</p>
        </div>
    </div>
  );
}