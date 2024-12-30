import { useDispatch, useSelector } from "react-redux";
import {
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
  addWorkExperience,
  removeWorkExperience,
  addProjects,
  removeProjects,
  addSkills,
  removeSkills,
} from "../redux/slices/cvSlice";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";
import { useState } from "react";

function CVForm() {
  const dispatch = useDispatch();

  const firstName = useSelector((state) => state.cv.firstName);
  const lastName = useSelector((state) => state.cv.lastName);
  const position = useSelector((state) => state.cv.position);
  const email = useSelector((state) => state.cv.email);
  const phone = useSelector((state) => state.cv.phone);
  const address = useSelector((state) => state.cv.address);
  const githubLink = useSelector((state) => state.cv.githubLink);
  const linkedinLink = useSelector((state) => state.cv.linkedinLink);
  const educationList = useSelector((state) => state.cv.education);
  const workExperienceList = useSelector((state) => state.cv.workExperience);
  const projectsList = useSelector((state) => state.cv.projects);
  const skillsList = useSelector((state) => state.cv.skills);

  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showProjectsForm, setShowProjectsForm] = useState(false);
  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const [newEducation, setNewEducation] = useState({
    education: "",
    institution: "",
    city: "",
    startDate: "2024",
    startMonth: "Ocak",
    endDate: "2024",
    endMonth: "Ocak",
  });
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    city: "",
    startDate: "2024",
    startMonth: "Ocak",
    endDate: "2024",
    endMonth: "Ocak",
    description: "", // Açıklama alanı
  });
  const [newProjects, setNewProjects] = useState({
    description: "",
  });
  const [newSkills, setNewSkills] = useState({
    description: "",
  });

  const handleChangeFirstName = (e) => {
    dispatch(setFirstName(e.target.value));
  };

  const handleChangeLastName = (e) => {
    dispatch(setLastName(e.target.value));
  };

  const handleChangePosition = (e) => {
    dispatch(setPosition(e.target.value));
  };

  const handleChangeEmail = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handleChangePhone = (e) => {
    dispatch(setPhone(e.target.value));
  };

  const handleChangeAddress = (e) => {
    dispatch(setAddress(e.target.value));
  };

  const handleChangeLinkedinLink = (e) => {
    dispatch(setLinkedInLink(e.target.value));
  };
  const handleChangeGithubLink = (e) => {
    dispatch(setGitHubLink(e.target.value));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProjectsChange = (e) => {
    const { name, value } = e.target;
    setNewProjects((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setNewSkills((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    if (
      !newEducation.education ||
      !newEducation.institution ||
      !newEducation.city ||
      !newEducation.startDate ||
      !newEducation.endDate
    ) {
      return;
    }

    const startDate = `${newEducation.startMonth} ${newEducation.startDate}`;
    const endDate = `${newEducation.endMonth} ${newEducation.endDate}`;

    const educationWithDates = {
      ...newEducation,
      startDate,
      endDate,
    };

    dispatch(addEducation(educationWithDates)); // Yeni eğitim ekleniyor
    setNewEducation({
      education: "",
      institution: "",
      city: "",
      startDate: "",
      endDate: "",
    });

    // Eğitim eklenirken formu kapatma ve doğru şekilde sıfırlama
    setShowEducationForm(false);
  };

  const handleAddExperience = () => {
    if (
      !newExperience.title ||
      !newExperience.company ||
      !newExperience.city ||
      !newExperience.startDate ||
      !newExperience.endDate ||
      !newExperience.description
    ) {
      return;
    }

    const startDate = `${newExperience.startMonth} ${newExperience.startDate}`;
    const endDate = `${newExperience.endMonth} ${newExperience.endDate}`;

    const experienceWithDates = {
      ...newExperience,
      startDate,
      endDate,
    };

    dispatch(addWorkExperience(experienceWithDates)); // Yeni deneyim ekleniyor
    setNewExperience({
      title: "",
      company: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    setShowExperienceForm(false);
  };

  const handleAddProjects = () => {
    if (!newProjects.description) {
      return;
    }

    const projectsDescriptionOnly = {
      description: newProjects.description,
    };

    dispatch(addProjects(projectsDescriptionOnly)); // Sadece description ekleniyor

    setNewProjects({
      description: "",
    });

    setShowProjectsForm(false);
  };

  const handleAddSkills = () => {
    if (!newSkills.description) {
      return;
    }

    const skillsDescriptionOnly = {
      description: newSkills.description,
    };

    dispatch(addSkills(skillsDescriptionOnly)); // Sadece description ekleniyor

    setNewSkills({
      description: "",
    });

    setShowSkillsForm(false);
  };

  const filteredEducationList = educationList.filter(
    (edu) =>
      edu.education !== "" &&
      edu.institution !== "" &&
      edu.city !== "" &&
      edu.startDate !== "" &&
      edu.endDate !== ""
  );

  const filteredExperienceList = workExperienceList.filter(
    (exp) =>
      exp.title !== "" &&
      exp.company !== "" &&
      exp.city !== "" &&
      exp.startDate !== "" &&
      exp.endDate !== "" &&
      exp.description !== ""
  );

  const filteredProjectsList = projectsList.filter(
    (prj) => prj.description !== ""
  );

  const filteredSkillsList = skillsList.filter((skl) => skl.description !== "");

  const handleRemoveEducation = (index) => {
    const actualIndex = educationList.findIndex(
      (edu) => edu === filteredEducationList[index]
    );

    if (actualIndex !== -1) {
      dispatch(removeEducation(actualIndex)); // Eğitim silindiğinde doğru index silinir
    }

    // Silme işleminden sonra formu tekrar açabilmek için
    if (educationList.length === 1) {
      setShowEducationForm(true);
    }
  };

  const handleRemoveExperience = (index) => {
    const actualIndex = workExperienceList.findIndex(
      (exp) => exp === filteredExperienceList[index]
    );

    if (actualIndex !== -1) {
      dispatch(removeWorkExperience(actualIndex)); // Deneyim siliniyor
    }

    if (actualIndex.length === 1) {
      setShowExperienceForm(true);
    }
  };

  const handleRemoveProjects = (index) => {
    const actualIndex = projectsList.findIndex(
      (prj) => prj === filteredProjectsList[index]
    );

    if (actualIndex !== -1) {
      dispatch(removeProjects(actualIndex)); // Deneyim siliniyor
    }

    if (actualIndex.length === 1) {
      setShowProjectsForm(true);
    }
  };

  const handleRemoveSkills = (index) => {
    const actualIndex = skillsList.findIndex(
      (skl) => skl === filteredSkillsList[index]
    );

    if (actualIndex !== -1) {
      dispatch(removeSkills(actualIndex)); // Deneyim siliniyor
    }

    if (actualIndex.length === 1) {
      setShowSkillsForm(true);
    }
  };

  const handleToggleEducationForm = () => {
    setShowEducationForm((prev) => !prev);
    if (!showEducationForm) {
      setNewEducation({
        education: "",
        institution: "",
        city: "",
        startDate: "2024",
        startMonth: "Ocak",
        endDate: "2024",
        endMonth: "Ocak",
      });
    }
  };

  const handleToggleExperienceForm = () => {
    setShowExperienceForm((prev) => !prev);
    if (!showExperienceForm) {
      setNewExperience({
        title: "",
        company: "",
        city: "",
        startDate: "2024",
        startMonth: "Ocak",
        endDate: "2024",
        endMonth: "Ocak",
        description: "",
      });
    }
  };

  const handleToggleProjectsForm = () => {
    setShowProjectsForm((prev) => !prev);
    if (!showProjectsForm) {
      setNewProjects({
        description: "",
      });
    }
  };

  const handleToggleSkillsForm = () => {
    setShowSkillsForm((prev) => !prev);
    if (!showSkillsForm) {
      setNewSkills({
        description: "",
      });
    }
  };

  // Eğitim tarihlerinin ay ve yıl listesini oluşturma
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 2000; i--) {
      years.push(i);
    }
    return years;
  };

  const generateMonthOptions = () => {
    return [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
  };

  // console.log(JSON.stringify(workExperienceList, null, 2));

  return (
    <div className="App">
      {/* İsim ve Soyisim */}
      <Stack direction="row" spacing={2}>
        <Box flex={1}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={handleChangeFirstName}
            fullWidth
          />
        </Box>
        <Box flex={1}>
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={handleChangeLastName}
            fullWidth
          />
        </Box>
      </Stack>

      {/* Pozisyon */}
      <TextField
        label="Position"
        variant="outlined"
        value={position}
        onChange={handleChangePosition}
        fullWidth
        margin="normal"
        sx={{ mt: 2 }}
      />

      {/* Email ve Telefon */}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Box flex={1}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleChangeEmail}
            fullWidth
          />
        </Box>
        <Box flex={1}>
          <TextField
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={handleChangePhone}
            fullWidth
          />
        </Box>
      </Stack>

      {/* Adres */}
      <TextField
        label="Address"
        variant="outlined"
        value={address}
        onChange={handleChangeAddress}
        fullWidth
        margin="normal"
        sx={{ mt: 2 }}
      />

      {/* Github ve Linkedin Link */}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Box flex={1}>
          <TextField
            label="Github"
            variant="outlined"
            value={githubLink}
            onChange={handleChangeGithubLink}
            fullWidth
          />
        </Box>
        <Box flex={1}>
          <TextField
            label="LinkedIn"
            variant="outlined"
            value={linkedinLink}
            onChange={handleChangeLinkedinLink}
            fullWidth
          />
        </Box>
      </Stack>

      <hr style={{ marginTop: "40px" }} />
      <Box sx={{ mt: 3 }}>
        {workExperienceList.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {filteredExperienceList.map((exp, index) => (
              <Box
                key={index}
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <TextField
                  label="Title"
                  variant="outlined"
                  value={exp.title}
                  disabled
                  fullWidth
                />
                <Button
                  onClick={() => handleRemoveExperience(index)}
                  sx={{ ml: 2 }}
                  color="error"
                >
                  <DeleteIcon />
                </Button>
              </Box>
            ))}
          </Box>
        )}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h3>DENEYİMLER</h3>
          {/* Eğitim ekleme butonunu her zaman göster */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(42, 42, 103)" }}
            onClick={handleToggleExperienceForm}
          >
            +
          </Button>
        </Stack>

        {showExperienceForm && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Title"
                variant="outlined"
                name="title"
                value={newExperience.title}
                onChange={handleExperienceChange}
                fullWidth
              />
              <TextField
                label="Company"
                variant="outlined"
                name="company"
                value={newExperience.company}
                onChange={handleExperienceChange}
                fullWidth
              />
              <TextField
                label="City"
                variant="outlined"
                name="city"
                value={newExperience.city}
                onChange={handleExperienceChange}
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Start Year"
                  variant="outlined"
                  select
                  fullWidth
                  name="startDate"
                  value={newExperience.startDate}
                  onChange={handleExperienceChange}
                  SelectProps={{ native: true }}
                >
                  {generateYearOptions().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </TextField>
                <TextField
                  label="Start Month"
                  variant="outlined"
                  select
                  fullWidth
                  name="startMonth"
                  value={newExperience.startMonth}
                  onChange={handleExperienceChange}
                  SelectProps={{ native: true }}
                >
                  {generateMonthOptions().map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </TextField>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="End Year"
                  variant="outlined"
                  select
                  fullWidth
                  name="endDate"
                  value={newExperience.endDate}
                  onChange={handleExperienceChange}
                  SelectProps={{ native: true }}
                >
                  {generateYearOptions().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </TextField>
                <TextField
                  label="End Month"
                  variant="outlined"
                  select
                  fullWidth
                  name="endMonth"
                  value={newExperience.endMonth}
                  onChange={handleExperienceChange}
                  SelectProps={{ native: true }}
                >
                  {generateMonthOptions().map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </TextField>
              </Stack>
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={newExperience.description}
                onChange={handleExperienceChange}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleAddExperience}
                sx={{ backgroundColor: "rgb(42, 42, 103)" }}
              >
                Add Experience
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
      <hr style={{ marginTop: "40px" }} />

      <Box sx={{ mt: 3 }}>
        {projectsList.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {filteredProjectsList.map((prj, index) => (
              <Box
                key={index}
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <TextField
                  label="Description"
                  variant="outlined"
                  value={`Proje ${index+1}`}
                  disabled
                  fullWidth
                />
                <Button
                  onClick={() => handleRemoveProjects(index)}
                  sx={{ ml: 2 }}
                  color="error"
                >
                  <DeleteIcon />
                </Button>
              </Box>
            ))}
          </Box>
        )}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h3>PROJELER</h3>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(42, 42, 103)" }}
            onClick={handleToggleProjectsForm}
          >
            +
          </Button>
        </Stack>

        {showProjectsForm && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={newProjects.description}
                onChange={handleProjectsChange}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "rgb(42, 42, 103)" }}
                onClick={handleAddProjects}
              >
                Add Project
              </Button>
            </Stack>
          </Box>
        )}
      </Box>

      <hr style={{ marginTop: "40px" }} />
      {/* Eğitimler Listesi */}
      <Box sx={{ mt: 3 }}>
        {/* Eğitimler listesi sadece eğitim varsa görünür */}
        {educationList.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {filteredEducationList.map((edu, index) => (
              <Box
                key={index}
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <TextField
                  label="Education"
                  variant="outlined"
                  value={edu.education}
                  disabled
                  fullWidth
                />
                <Button
                  onClick={() => handleRemoveEducation(index)}
                  sx={{ ml: 2 }}
                  color="error"
                >
                  <DeleteIcon />
                </Button>
              </Box>
            ))}
          </Box>
        )}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h3>EĞİTİMLER</h3>
          {/* Eğitim ekleme butonunu her zaman göster */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(42, 42, 103)" }}
            onClick={handleToggleEducationForm}
          >
            +
          </Button>
        </Stack>
      </Box>

      {/* Yeni Eğitim Formu */}
      {showEducationForm && (
        <Box sx={{ mt: 2 }}>
          <Stack direction="column" spacing={2}>
            <TextField
              label="Education"
              variant="outlined"
              name="education"
              value={newEducation.education}
              onChange={handleEducationChange}
              fullWidth
            />
            <TextField
              label="Institution"
              variant="outlined"
              name="institution"
              value={newEducation.institution}
              onChange={handleEducationChange}
              fullWidth
            />
            <TextField
              label="City"
              variant="outlined"
              name="city"
              value={newEducation.city}
              onChange={handleEducationChange}
              fullWidth
            />

            {/* Start Date Select */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Start Year"
                variant="outlined"
                select
                fullWidth
                name="startDate"
                value={newEducation.startDate} // `value` ile bağladık
                onChange={handleEducationChange}
                SelectProps={{
                  native: true,
                }}
              >
                {generateYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </TextField>

              <TextField
                label="Start Month"
                variant="outlined"
                select
                fullWidth
                name="startMonth"
                value={newEducation.startMonth} // `value` ile bağladık
                onChange={handleEducationChange}
                SelectProps={{
                  native: true,
                }}
              >
                {generateMonthOptions().map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </TextField>
            </Stack>

            {/* End Date Select */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="End Year"
                variant="outlined"
                select
                fullWidth
                name="endDate"
                value={newEducation.endDate} // `value` ile bağladık
                onChange={handleEducationChange}
                SelectProps={{
                  native: true,
                }}
              >
                {generateYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </TextField>

              <TextField
                label="End Month"
                variant="outlined"
                select
                fullWidth
                name="endMonth"
                value={newEducation.endMonth} // `value` ile bağladık
                onChange={handleEducationChange}
                SelectProps={{
                  native: true,
                }}
              >
                {generateMonthOptions().map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </TextField>
            </Stack>

            <Button
              variant="contained"
              sx={{ backgroundColor: "rgb(42, 42, 103)" }}
              onClick={handleAddEducation}
            >
              Add Education
            </Button>
          </Stack>
        </Box>
      )}
      <hr style={{ marginTop: "40px" }} />

      <Box sx={{ mt: 3 }}>
        {skillsList.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {filteredSkillsList.map((skl, index) => (
              <Box
                key={index}
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <TextField
                  label="Description"
                  variant="outlined"
                  value={skl.description}
                  disabled
                  fullWidth
                />
                <Button
                  onClick={() => handleRemoveSkills(index)}
                  sx={{ ml: 2 }}
                  color="error"
                >
                  <DeleteIcon />
                </Button>
              </Box>
            ))}
          </Box>
        )}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h3>YETENEKLER</h3>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(42, 42, 103)" }}
            onClick={handleToggleSkillsForm}
          >
            +
          </Button>
        </Stack>

        {showSkillsForm && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={newSkills.description}
                onChange={handleSkillsChange}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "rgb(42, 42, 103)" }}
                onClick={handleAddSkills}
              >
                Add Skills
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
      <hr style={{ marginTop: "40px" }} />
    </div>
  );
}

export default CVForm;
