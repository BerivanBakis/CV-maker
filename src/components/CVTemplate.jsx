import "../App.css";
import React from "react";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import emailPng from "../assets/email.png";
import phonePng from "../assets/telephone.png";
import addressPng from "../assets/location.png";
import { emailIcon, phoneIcon, locationIcon, githubIcon, linkedinIcon } from "./icons";
import { font } from "../fonts/IBMPlexSans-Light-normal";
import { italicFont } from "../fonts/IBMPlexSans-LightItalic-normal";
import { boldFont } from "../fonts/ArchivoNarrow-SemiBold-normal";
function CVTemplate() {
  const cvData = useSelector((state) => state.cv);

  const generatePDF = () => {
    const pdf = new jsPDF();

    pdf.addFileToVFS("Roboto-ThinItalic-normal.ttf", font);
    pdf.addFont("Roboto-ThinItalic-normal.ttf", "normal", "normal");
    pdf.addFileToVFS("Roboto-Bold-normal.ttf", italicFont);
    pdf.addFont("Roboto-Bold-normal.ttf", "italic", "normal");
    pdf.addFileToVFS("Roboto-Bold-normal.ttf", boldFont);
    pdf.addFont("Roboto-Bold-normal.ttf", "bold", "normal");
    pdf.setFont("bold");
    console.log(pdf.getFontList());

    const addressLink = `https://www.google.com/maps?q=${encodeURIComponent(
      cvData.address
    )}`;
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 0;

    const padding = 5;
    const iconY = 5; 

    const githubX = pageWidth - 5 - padding;
    if (cvData.githubLink) {
      pdf.addImage(githubIcon, "PNG", githubX, iconY, 5, 5);
      pdf.link(githubX, iconY, 5, 5, { url: cvData.githubLink });
  }
  
  if (cvData.linkedinLink) {
      const linkedinX = githubX - 5 - 5;
      pdf.addImage(linkedinIcon, "PNG", linkedinX, iconY, 5, 5);
      pdf.link(linkedinX, iconY, 5, 5, { url: cvData.linkedinLink });
  }
  

    pdf.setFontSize(20);
    pdf.setFont("bold");
    const fullName = `${cvData.firstName} ${cvData.lastName}`;
    const fullNameWidth = pdf.getTextWidth(fullName);
    pdf.text(fullName, (pageWidth - fullNameWidth) / 2, 17);

    pdf.setFontSize(14);
    pdf.setFont("normal");
    const position = cvData.position;
    const positionWidth = pdf.getTextWidth(position);
    pdf.text(position, (pageWidth - positionWidth) / 2, 25);

    const startX = 10;
    const endX = pageWidth - 10;
    yPosition = 28;
    pdf.setLineWidth(0.5);
    pdf.line(startX, yPosition, endX, yPosition);

    yPosition += 8;

    const iconSize = 5;
    pdf.addImage(emailIcon, "PNG", 10, yPosition - 4, iconSize, iconSize);

    pdf.setFontSize(12);
    pdf.text(cvData.email, 17, yPosition);

    const phoneText = `${cvData.phone}`;
    const phoneX = 90;
    pdf.addImage(phoneIcon, "PNG", phoneX, yPosition - 4, iconSize, iconSize);
    pdf.text(phoneText, phoneX + 7, yPosition);

    const addressText = `${cvData.address}`;
    const addressX = 150;
    pdf.addImage(
      locationIcon,
      "PNG",
      addressX,
      yPosition - 4,
      iconSize,
      iconSize
    );
    pdf.setFontSize(8);
    const addressLines = pdf.splitTextToSize(
      addressText,
      pageWidth - addressX - 13
    );
    pdf.text(addressLines, addressX + 7, yPosition - 2);
    pdf.setFontSize(12);
    pdf.link(addressX + 7, yPosition - 4, pdf.getTextWidth(addressText), 10, {
      url: addressLink,
    });

    yPosition += 5;
    const addressLineStartX = 10;
    const addressLineEndX = pageWidth - 10;
    pdf.setLineWidth(0.5);
    pdf.line(addressLineStartX, yPosition, addressLineEndX, yPosition);

    pdf.setFont("bold");
    pdf.setFontSize(18);
    yPosition += 11;
    pdf.text("DENEYİMLER", 10, yPosition);
    pdf.setFontSize(11);

    cvData.workExperience.forEach((job, index) => {
      if (index !== 0) {
        yPosition += 8;
        pdf.setFont("bold");
        pdf.text(`${job.title.toUpperCase()} /`, 10, yPosition);

        const titleWidth = pdf.getTextWidth(`${job.title.toUpperCase()} |`);

        pdf.setFontSize(11);
        pdf.setFont("italic");
        pdf.text(
          `${job.startDate} - ${job.endDate}`,
          10 + titleWidth + 2,
          yPosition
        );

        pdf.setFont("normal");
        yPosition += 6;
        pdf.text(`${job.company} - ${job.city}`, 10, yPosition);

        const descriptionWidth = pageWidth - 20;
        if (job.description) {
          yPosition += 5;
          const descriptionLines = pdf.splitTextToSize(
            job.description,
            descriptionWidth
          );
          pdf.text(descriptionLines, 10, yPosition);
          yPosition += descriptionLines.length * 3; // Yükseklik arttırıldı, sadece açıklama kadar
        }
      }
    });

    pdf.setFontSize(18);
    pdf.setFont("bold");
    yPosition += 11;
    pdf.text("PROJELER", 10, yPosition);
    pdf.setFontSize(11);
    yPosition += 3;
    cvData.projects.forEach((prj, index) => {
      const descriptionWidth = pageWidth - 30;
      if (prj.description) {
        yPosition += 4;
        pdf.setFont("bold");
        pdf.text(`•`, 10, yPosition);
        pdf.setFont("normal");
        const descriptionLines = pdf.splitTextToSize(
          prj.description,
          descriptionWidth
        );
        pdf.text(descriptionLines, 15, yPosition);

        if (descriptionLines.length === 1) {
          yPosition += 3; // Tek satırlı maddeler için daha az boşluk
        } else {
          yPosition += descriptionLines.length * 3 + 3; // Çok satırlı açıklamalar için
        }
      }
    });

    pdf.setFontSize(18);
    yPosition += 11;
    pdf.setFont("bold");
    pdf.text("EĞİTİM", 10, yPosition);
    pdf.setFontSize(12);
    cvData.education.forEach((edu, index) => {
      if (index != 0) {
        pdf.setFontSize(11);
        yPosition += 7;
        pdf.setFont("bold");
        pdf.text(`${edu.institution.toUpperCase()} /`, 10, yPosition);

        const institutionWidth = pdf.getTextWidth(
          `${edu.institution.toUpperCase()} |`
        );

        pdf.setFont("italic");
        pdf.text(edu.city, 10 + institutionWidth + 2, yPosition);
        yPosition += 6;

        pdf.setFont("normal");
        pdf.text(`${edu.education.toUpperCase()}`, 10, yPosition);

        pdf.setFontSize(10);
        yPosition += 5;
        pdf.text(`${edu.startDate} - ${edu.endDate}`, 10, yPosition);
      }
    });

    pdf.setFontSize(18);
    yPosition += 11;
    pdf.setFont("bold");
    pdf.text("YETENEKLER", 10, yPosition);
    pdf.setFontSize(11);
    const columnWidth = (pageWidth - 20) / 3;
    const skillX = 10;
    let currentColumn = 0;
    let currentRowY = yPosition;
    currentRowY += 7;
    cvData.skills.forEach((skill, index) => {
      if (index !== 0) {
        pdf.setFont("normal");
        const skillText = `• ${skill.description}`;
        const columnX = skillX + currentColumn * columnWidth;

        pdf.text(skillText, columnX, currentRowY);

        currentColumn++;
        if (currentColumn === 3) {
          currentColumn = 0;
          currentRowY += 7;
        }
      }
    });

    yPosition = currentRowY + 10;

    pdf.save("cv-template.pdf");
  };

  return (
    <div className="PDF-viewer">
      <div className="PDF-title">
        <h1>{`${cvData.firstName} ${cvData.lastName}`}</h1>
        <p>{cvData.position}</p>
      </div>
      <hr
        style={{ border: "0", borderTop: "2px solid #000", margin: "10px 0" }}
      />
      <div className="contact-section">
        <div className="email">
          <img src={emailPng} alt="email" />
          <p>{cvData.email}</p>
        </div>
        <div className="phone">
          <img src={phonePng} alt="email" />
          <p>{cvData.phone}</p>
        </div>
        <div className="address">
          <img src={addressPng} alt="email" />
          <p>{cvData.address}</p>
        </div>
      </div>
      <hr
        style={{ border: "0", borderTop: "2px solid #000", margin: "10px 0" }}
      />
      <section className="job-experience">
        <h2>DENEYİMLER</h2>
        {cvData.workExperience.map(
          (job, index) =>
            index !== 0 && (
              <div style={{ margin: "15px 0" }} key={index}>
                <p>
                  <strong>{job.title}</strong> /{" "}
                  <span style={{ fontStyle: "italic" }}>
                    {job.startDate} - {job.endDate}
                  </span>
                </p>
                <p>
                  {job.company} - {job.city}
                  <br />
                  {job.description}
                </p>
              </div>
            )
        )}
      </section>
      <section className="projects">
        <h2>PROJELER</h2>
        <ul>
          {cvData.projects.map(
            (job, index) =>
              index !== 0 && <li key={index}>{job.description}</li>
          )}
        </ul>
      </section>
      <section className="education">
        <h2>EĞİTİM</h2>
        {cvData.education.map(
          (edu, index) =>
            index !== 0 && (
              <p key={index}>
                <strong>{edu.institution}</strong> /{" "}
                <span style={{ fontStyle: "italic" }}>{edu.city}</span>
                <br />{" "}
                <span style={{ textTransform: "uppercase" }}>
                  {edu.education}
                </span>
                <br />
                {edu.startDate} - {edu.endDate}
              </p>
            )
        )}
      </section>
      <section className="skills">
        <h2>YETENEKLER</h2>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {cvData.skills.map(
            (skl, index) =>
              index !== 0 && (
                <li
                  key={index}
                  style={{ flex: "1 0 30%", boxSizing: "border-box" }}
                >
                  {skl.description}
                </li>
              )
          )}
        </ul>
      </section>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={generatePDF}
          style={{
            padding: "10px 20px",
            background: "rgb(42, 42, 103)",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          PDF İndir
        </button>
      </div>
    </div>
  );
}

export default CVTemplate;
