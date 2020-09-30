import React from 'react';
import '../Assets/App.css';
import Header from '../Component/Header';

export default function LandingPage() {
  const containerStyle = {
    marginLeft: 40, marginTop: 100
  };

  return (
    <div>
      <Header/>
      <div className="container" style={containerStyle}><br/><br/>
        </div>
    </div>
  );
}
