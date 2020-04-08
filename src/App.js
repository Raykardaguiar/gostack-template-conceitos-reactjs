import React, { useEffect, useState } from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  const [projects, setProject] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(`repositories`)
      setProject([...data])
    }
    fetchData()
  }, [])

  async function handleAddRepository() {
    const prepareBody = {
      title: `Novo item ${Date.now()}`,
      techs: ['NodeBolado', 'ReactAvassalador'],
      url: "https://github.com/Rocketseat/umbriel",
    }
    try {
      const { data } = await api.post(`repositories`, prepareBody)
      setProject([...projects, data])
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      const removeItem = projects.filter(project => project.id !== id)
      setProject([...removeItem])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="main-repository">
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}>
          <span>{project.title}</span>
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
