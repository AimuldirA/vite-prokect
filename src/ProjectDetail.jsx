import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProjectDetail = () => {
  const { id } = useParams(); 
  const projects = useSelector((state) => state.projects.list); 

  
  const project = projects.find((project) => project.id === parseInt(id));

  if (!project) {
    return <p>Төсөл олдсонгүй!</p>; 
  }

  return (
    <div className='flex-items-center justify-center'>
      <h1>Төслийн дэлгэрэнгүй</h1>    
      <p>ID: {project.id}</p>
      <p>Name: {project.name}</p>
      <p>Description: This is {project.name}'s description</p>
    </div>
  );
};

export default ProjectDetail;
