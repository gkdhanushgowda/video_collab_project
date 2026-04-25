import { useEffect, useState } from 'react';

import API from '../services/api';


function Dashboard() {

  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState('');


  // -----------------------------
  // Fetch Projects
  // -----------------------------
  const fetchProjects = async () => {

    try {

      const response = await API.get('projects/');

      setProjects(response.data);

    } catch (error) {

      console.error(error);
    }
  };


  // -----------------------------
  // Create Project
  // -----------------------------
  const createProject = async () => {

    if (!projectName.trim()) return;

    try {

      await API.post('projects/', {
        name: projectName
      });

      setProjectName('');

      fetchProjects();

    } catch (error) {

      console.error(error);
    }
  };


  // -----------------------------
  // Load Projects on Page Load
  // -----------------------------
  useEffect(() => {

    fetchProjects();

  }, []);


  return (

    <div className="container mt-5">

      <h1 className="mb-4">
        Video Collaboration Dashboard 🎬
      </h1>


      {/* Create Project */}
      <div className="card p-4 mb-4">

        <h4>Create Project</h4>

        <div className="d-flex gap-2">

          <input
            type="text"
            className="form-control"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={createProject}
          >
            Create
          </button>

        </div>

      </div>


      {/* Project List */}
      <div className="row">

        {projects.map((project) => (

          <div
            key={project.id}
            className="col-md-4 mb-3"
          >

            <div className="card p-3">

              <h5>{project.name}</h5>

              <p>
                Project ID: {project.id}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}


export default Dashboard;