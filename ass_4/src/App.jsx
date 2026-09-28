import { useState } from "react";
import AgentCard from "./components/AgentCard";

const initialAgents = [
  {
    id: 1,
    name: "Jett",
    role: "Duelist",
    status: "Active",
  },
  {
    id: 2,
    name: "Sage",
    role: "Sentinel",
    status: "Active",
  },
  {
    id: 3,
    name: "Omen",
    role: "Controller",
    status: "Benched",
  },
  {
    id: 4,
    name: "Phoenix",
    role: "Duelist",
    status: "Active",
  },
  {
    id: 5,
    name: "Sova",
    role: "Initiator",
    status: "Benched",
  },
];

function App() {
  console.log("App re-rendered");

  const [agents, setAgents] = useState(initialAgents);
  const [filter, setFilter] = useState("All");
  const [nextId, setNextId] = useState(6);

  // Add a new agent
  function addAgent() {
    const newAgent = {
      id: nextId,
      name: `Agent ${nextId}`,
      role: "Duelist",
      status: "Active",
    };

    setAgents([...agents, newAgent]);
    setNextId(nextId + 1);
  }

  // Delete an agent
  function deleteAgent(id) {
    setAgents(agents.filter((agent) => agent.id !== id));
  }

  // Change Active / Benched status
  function changeStatus(id) {
    setAgents(
      agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: agent.status === "Active" ? "Benched" : "Active",
            }
          : agent
      )
    );
  }

  // Reverse list
  function reverseAgents() {
    setAgents([...agents].reverse());
  }

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    if (filter === "All") {
      return true;
    }

    return agent.status === filter;
  });

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">PROTOCOL // AGENT DATABASE</p>

          <h1>
            VALORANT
            <span> AGENTS</span>
          </h1>

          <p className="subtitle">
            Manage your agent roster, status and match activity.
          </p>
        </div>

        <div className="agent-count">
          <span>AGENTS</span>
          <strong>{agents.length}</strong>
        </div>
      </header>

      <section className="controls">
        <div className="filters">
          <button
            className={filter === "All" ? "active-filter" : ""}
            onClick={() => setFilter("All")}
          >
            ALL
          </button>

          <button
            className={filter === "Active" ? "active-filter" : ""}
            onClick={() => setFilter("Active")}
          >
            ACTIVE
          </button>

          <button
            className={filter === "Benched" ? "active-filter" : ""}
            onClick={() => setFilter("Benched")}
          >
            BENCHED
          </button>
        </div>

        <div className="actions">
          <button className="secondary-button" onClick={reverseAgents}>
            ⇄ REVERSE
          </button>

          <button className="add-button" onClick={addAgent}>
            + ADD AGENT
          </button>
        </div>
      </section>

      <main className="agent-grid">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onDelete={deleteAgent}
            onStatusChange={changeStatus}
          />
        ))}
      </main>

      {filteredAgents.length === 0 && (
        <div className="empty-message">
          <h2>NO AGENTS FOUND</h2>
          <p>Change the current filter.</p>
        </div>
      )}

      <footer>
        <span>VALORANT AGENT DATABASE</span>
        <span>REACT // STATE MANAGEMENT</span>
      </footer>
    </div>
  );
}

export default App;