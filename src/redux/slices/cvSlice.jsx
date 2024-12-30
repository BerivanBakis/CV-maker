import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  position: "",
  email: "",
  phone: "",
  address: "",
  githubLink: "", 
  linkedinLink: "", 
  education: [
    {
      education: "",
      institution: "",
      city: "",
      startDate: "",
      endDate: "",
    },
  ],
  workExperience: [
    {
      jobTitle: "",
      employer: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  projects: [
    {
      description: "",
    },
  ],
  skills: [
    {
      description: "",
    },
  ],
  languages: [],
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setGitHubLink: (state, action) => { // GitHub Linki Güncelleme
      state.githubLink = action.payload;
    },
    setLinkedInLink: (state, action) => { // LinkedIn Linki Güncelleme
      state.linkedinLink = action.payload;
    },
    addEducation: (state, action) => {
      state.education.push(action.payload);
    },
    removeEducation: (state, action) => {
      state.education = state.education.filter(
        (item, index) => index !== action.payload
      );
    },
    updateEducation: (state, action) => {
      const { index, updatedEducation } = action.payload;
      state.education[index] = updatedEducation;
    },
    addWorkExperience: (state, action) => {
      state.workExperience.push(action.payload);
    },
    removeWorkExperience: (state, action) => {
      state.workExperience = state.workExperience.filter(
        (item, index) => index !== action.payload
      );
    },
    updateWorkExperience: (state, action) => {
      const { index, updatedWorkExperience } = action.payload;
      state.workExperience[index] = updatedWorkExperience;
    },
    addProjects: (state, action) => {
      state.projects.push(action.payload);
    },
    removeProjects: (state, action) => {
      state.projects = state.projects.filter(
        (item, index) => index !== action.payload
      );
    },
    updateProjects: (state, action) => {
      const { index, updatedProjects } = action.payload;
      state.projects[index] = updatedProjects;
    },
    addSkills: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkills: (state, action) => {
      state.skills = state.skills.filter(
        (item, index) => index !== action.payload
      );
    },
    updateSkills: (state, action) => {
      const { index, updatedSkills } = action.payload;
      state.skills[index] = updatedSkills;
    },
    addLanguage: (state, action) => {
      state.languages.push(action.payload);
    },
    removeLanguage: (state, action) => {
      state.languages = state.languages.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setPosition,
  setEmail,
  setPhone,
  setAddress,
  setGitHubLink,
  setLinkedInLink,
  addEducation,
  removeEducation,
  updateEducation,
  addWorkExperience,
  removeWorkExperience,
  updateWorkExperience,
  addProjects,
  removeProjects,
  updateProjects,
  addSkills,
  removeSkills,
  updateSkills,
  addLanguage,
  removeLanguage,
} = cvSlice.actions;

export default cvSlice.reducer;
