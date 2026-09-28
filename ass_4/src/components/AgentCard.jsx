import { useState } from "react";

function AgentCard({ agent, onDelete, onStatusChange }) {
  console.log("AgentCard re-rendered:", agent.name);

  const [matches, setMatches] = useState(0);
  const [resetVersion, setResetVersion] = useState(0);

  function addMatch() {
    setMatches(matches + 1);
  }

  function resetMatches() {
    setMatches(0);
    setResetVersion(resetVersion + 1);
  }

  return (
    <article className="agent-card">
      <div className="card-top">
        <span className="agent-id">
          AGENT // {String(agent.id).padStart(2, "0")}
        </span>

        <span
          className={
            agent.status === "Active"
              ? "status active-status"
              : "status benched-status"
          }
        >
          {agent.status}
        </span>
      </div>

      <div className="agent-symbol">
        {agent.name.charAt(0)}
      </div>

      <div className="agent-info">
        <p className="role">{agent.role}</p>
        <h2>{agent.name}</h2>
      </div>

      <div className="match-section">
        <span>MATCH ACTIVITY</span>

        <div className="match-number" key={resetVersion}>
          {matches}
        </div>

        <p>matches played</p>
      </div>

      <div className="match-buttons">
        <button onClick={addMatch}>
          + MATCH
        </button>

        <button onClick={resetMatches}>
          RESET
        </button>
      </div>

      <div className="card-actions">
        <button
          className="status-button"
          onClick={() => onStatusChange(agent.id)}
        >
          CHANGE STATUS
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(agent.id)}
        >
          DELETE
        </button>
      </div>
    </article>
  );
}

export default AgentCard;