function Dashboard({ user, onLogout }) {

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">

        <div className="brand">
          McRae DevLab
        </div>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </header>


      <main className="dashboard">

        <section className="welcome">

          <p className="eyebrow">
            DEVELOPER WORKSPACE
          </p>

          <h1>
            Welcome back, {user.username}
          </h1>

          <p>
            You're successfully authenticated.
          </p>

        </section>


        <section className="stats">

          <div className="stat-card">
            <span>Projects</span>
            <strong>06</strong>
          </div>

          <div className="stat-card">
            <span>Skills</span>
            <strong>08</strong>
          </div>

          <div className="stat-card">
            <span>Status</span>
            <strong>ONLINE</strong>
          </div>

        </section>


        <section className="workspace">

          <h2>Recent Work</h2>

          <div className="project-list">

            <div>
              <strong>AMR Navigation</strong>
              <span>Robotics</span>
            </div>

            <div>
              <strong>React Applications</strong>
              <span>Web Development</span>
            </div>

            <div>
              <strong>ML Experiments</strong>
              <span>Artificial Intelligence</span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;