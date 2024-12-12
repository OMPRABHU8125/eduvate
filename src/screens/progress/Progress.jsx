const Progress = () => (
    <div className="progress section">
      <div className="content">
        <h2>Your Progress</h2>
        <p>Track your achievements and milestones here!</p>
        <div className="progress-graph">
          {/* Example Graph Placeholder */}
          <div className="graph-bar" style={{ height: "80%" }}></div>
          <div className="graph-bar" style={{ height: "60%" }}></div>
          <div className="graph-bar" style={{ height: "90%" }}></div>
        </div>
      </div>
      <img src="/images/progress.png" alt="Progress illustration" className="section-image" />
    </div>
  );

  export default Progress;
