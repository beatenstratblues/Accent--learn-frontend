import React from 'react'

const ProfilePage = () => {
  return (
<div className="profile-container">
      {/* Profile Banner */}
      <div className="profile-banner">
        <div className="profile-image">
          <span>+</span>
        </div>
        <button className="edit-btn">✎</button>
      </div>

      {/* User Info */}
      <div className="user-info">
        <h2>Name</h2>
        <p className="username">@username</p>
        <p className="join-date">Joined March 2025</p>
        <div className="flag-icon"></div>
      </div>

      {/* Statistics Section */}
      <div className="statistics">
        <h3>Statistics</h3>
        <div className="stats-grid"> 
          <div className="stat-card">
            <p className="stat-number">0</p>
            <p className="stat-label">Day Streak</p>
          </div>
          <div className="stat-card">
            <p className="stat-number">0</p>
            <p className="stat-label">Total Points</p>
          </div>
          <div className="stat-card">
            <p className="stat-number">None</p>
            <p className="stat-label">Current Quest</p>
          </div>
          <div className="stat-card">
            <p className="stat-number">0</p>
            <p className="stat-label">Top 3 Finishes</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage