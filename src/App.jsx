import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material"; // MUI bileşenlerini import ettik
import CVForm from "./components/CVForm";
import CVTemplate from "./components/CVTemplate";
import "./App.css";
function App() {
  return (
    <div>
      <AppBar
        className="app-bar"
        position="fixed"
        sx={{ backgroundColor: "rgb(42, 42, 103)" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center", fontSize: "24px" }}
          >
            CV OLUŞTURUCU
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="app-container">
        <div className="cv-form-container">
          <CVForm />
        </div>
        <div className="cv-template-container">
          <div className="cv-template-wrapper">
            <CVTemplate />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
