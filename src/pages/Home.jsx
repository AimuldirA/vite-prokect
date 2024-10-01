import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Add this import
import { addProject, deleteProject, editProject } from "../reducers/projectReducer";

function Home() {
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const dispatch = useDispatch();
  const Projects = useSelector((state) => state.projects.list); // Getting projects from the store

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditName(e.target.value);
  };

  const handleAdd = () => {
    if (newName.trim() === '') {
      return; 
    }
    const newId = Projects.length > 0 ? Math.max(...Projects.map(p => p.id), 0) + 1 : 1; 
    dispatch(addProject({ id: newId, name: newName }));
    setNewName('');
  };

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  const handleEdit = (id) => {
    setEditId(id);
    const projectToEdit = Projects.find((project) => project.id === id);
    if (projectToEdit) {
      setEditName(projectToEdit.name); // Set edit input with current project name
    }
  };

  const updateProject = () => {
    if (editName.trim() === '') {
      return; 
    }
    dispatch(editProject({ id: editId, name: editName })); // Passing correct payload
    setEditId(null);
    setEditName('');
  };

  return (
    <div className="ml-8 space-y-4 mt-8">
      <h1 className="text-blue-600 text-2xl ml-48">Project list</h1>
      <ul className=" space-y-4 w-1/2">
        {Projects.map((project) => (
          <li className="flex items-center space-x-2" key={project.id}>
            <span className="flex-grow">{project.name}</span>
            <div className="space-x-2">
              <Link to={`/project/${project.id}`}>
                <button className="border border-black rounded-sm px-4 py-2 text-sm">View Details</button>
              </Link>
              <button onClick={() => handleEdit(project.id)} className="border border-black rounded-sm px-4 py-2 text-sm">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="border border-black rounded-sm px-4 py-2 text-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-x-2 ml-52">
        {editId !== null ? (
          <>
            <input
              className="border border-black rounded-sm"
              type="text"
              value={editName}
              onChange={handleEditChange}
            />
            <button onClick={updateProject} className="border border-black rounded-sm">
              Save
            </button>
          </>
        ) : (
          <>
            <input
              className="border border-black rounded-sm"
              type="text"
              value={newName}
              onChange={handleChange}
            />
            <button onClick={handleAdd} className="border border-black rounded-sm w-24">
              Add
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
