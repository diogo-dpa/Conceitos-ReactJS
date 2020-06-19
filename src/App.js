import React, {useState, useEffect} from "react";

// Import api function to connect with backend
import api from './services/api'
import "./styles.css";

function App() {

  // Initialize repo
  const [repo, setRepo] = useState([])

  // Execute once in the beginning
  useEffect( () => {
    api.get('/repositories').then(
      response => setRepo([...response.data])
    )
  }, [] )

  async function handleAddRepository() {
    api.post('/repositories', 
    {
      title: `Titulo ${Date.now()}`,
      url: 'qualquerURL',
      techs: ['ReactJS'] 
    }).then(response => setRepo([...repo, response.data]))
    
  }

  async function handleRemoveRepository(id) {
    // Call DELETE Method
    api.delete(`/repositories/${id}`)
    
    // Using the filter function
    setRepo(repo.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map(repository => <li key={repository.id}>
                                  {repository.title} 
                                  <button onClick={() => handleRemoveRepository(repository.id)}>
                                    Remover
                                  </button> 
                                </li> 
                  )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
