import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  // Mock user data - in a real app, you would fetch this from your backend
  const [userData, setUserData] = useState({
    username: "User123",
    points: 250,
    questsCompleted: 8,
    streak: 5,
    level: 3,
    recentActivities: [
      {
        date: "March 15",
        activity: "Completed 'Alphabet Pronunciation'",
        points: "+25",
      },
      {
        date: "March 14",
        activity: "Completed 'Daily Challenge'",
        points: "+15",
      },
      {
        date: "March 13",
        activity: "Practiced 'Word Pronunciation'",
        points: "+30",
      },
    ],
  });

  // Mock recommended activities
  const recommendedActivities = [
    {
      id: 1,
      title: "Alphabet Practice",
      description: "Master the sounds of English letters",
      difficulty: "Beginner",
      path: "/letters",
    },
    {
      id: 2,
      title: "Word Pronunciation",
      description: "Practice pronouncing common words",
      difficulty: "Intermediate",
      path: "/words",
    },
    {
      id: 3,
      title: "Daily Challenge",
      description: "Complete today's pronunciation task",
      difficulty: "Mixed",
      path: "/daily",
    },
  ];

  // Time-based greeting
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="home-page">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>
            {greeting}, {userData.username}!
          </h1>
          <p>Ready to improve your pronunciation today?</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2>Your Progress</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency/48/star.png"
                alt="points"
              />
            </div>
            <div className="stat-number">{userData.points}</div>
            <div className="stat-label">Total Points</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency/48/checkmark.png"
                alt="quests"
              />
            </div>
            <div className="stat-number">{userData.questsCompleted}</div>
            <div className="stat-label">Quests Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency/48/fire-element.png"
                alt="streak"
              />
            </div>
            <div className="stat-number">{userData.streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency/48/prize.png"
                alt="level"
              />
            </div>
            <div className="stat-number">{userData.level}</div>
            <div className="stat-label">Current Level</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Recommended Activities */}
        <div className="recommended-section">
          <h2>Recommended Activities</h2>
          <div className="activities-grid">
            {recommendedActivities.map((activity) => (
              <Link
                to={activity.path}
                key={activity.id}
                className="activity-card"
              >
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <div className="activity-footer">
                  <span className="difficulty-tag">{activity.difficulty}</span>
                  <span className="start-btn">Start</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {userData.recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-date">{activity.date}</div>
                <div className="activity-info">{activity.activity}</div>
                <div className="activity-points">{activity.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
