import React from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";

const AppLayout = () => {
  const navigate = new useNavigate();

  return (
        <div className="app-container">
      <aside className="sidebar">
        <div className="logo"><img width="50" height="50" src="https://img.icons8.com/ios/50/40C057/parrot-speaking.png" alt="parrot-speaking"/><span>Accentra</span></div>
        <nav className="nav-buttons">
          <Link to='/' className="sidebar-button"><button><img width="40" height="40" src="https://img.icons8.com/fluency/48/home.png" alt="home"/> <span>Home</span></button></Link>
          <Link to='/letters' className="sidebar-button"><button><img width="40" height="40" src="https://img.icons8.com/office/40/abc.png" alt="abc"/>Letters</button></Link>
          <Link to='/words' className="sidebar-button"><button><img width="40" height="40" src="https://img.icons8.com/fluency/48/dictionary.png" alt="dictionary"/>Words</button></Link>
          <Link to='/quests' className="sidebar-button"><button><img width="40" height="40" src="https://img.icons8.com/fluency/48/treasure-chest.png" alt="treasure-chest"/>Quests</button></Link>
        </nav>
       <button className="profile" onClick={() => navigate("/profile")}><img width="48" height="48" src="https://img.icons8.com/fluency/48/user-male-circle--v1.png" alt="user-male-circle--v1"/>Profile</button>
      </aside>
      
      <header className="topbar">
        <div className="top-buttons">
          <div><img width="40" height="40" src="https://img.icons8.com/fluency/48/treasure-chest.png" alt="treasure-chest"/><span style={{color:'gold'}}>Quests</span></div>
          <div><img width="35" height="35" src="https://img.icons8.com/ios-filled/50/40C057/rating-circled.png" alt="rating-circled"/><span>Points</span></div>
        </div>
      </header>

      <main className="display-screen">
       <Outlet/>
      </main>
    </div>
  )
}

export default AppLayout