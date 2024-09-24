import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [
      { id: 1, name: "Project1" },
      { id: 2, name: "Project2" },
      { id: 3, name: "Project3" },
    ],
  },
  reducers: {
    addProject: (state, action) => {
      const newId = state.list.length > 0 ? Math.max(...state.list.map(p => p.id)) + 1 : 1;
      state.list.push({ id: newId, name: action.payload.name });
    },
    deleteProject: (state, action) => {
      state.list = state.list.filter((project) => project.id !== action.payload);
    },
    editProject: (state, action) => {
      state.list = state.list.map((project) =>
        project.id === action.payload.id ? { ...project, name: action.payload.name } : project
      );
    },
  },
});

export const { addProject, deleteProject, editProject } = projectSlice.actions;

export default projectSlice.reducer;
