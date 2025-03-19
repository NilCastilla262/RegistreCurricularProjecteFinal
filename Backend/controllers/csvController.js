//controllers/csvController.js
const fs = require('fs');
const csv = require('csv-parser');
const CompetenciesModel = require('../models/competenciesModel');

exports.uploadCsv = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No s\'ha enviat cap fitxer' });
  }

  const subjectType = req.body.Type || 'específica';
  const competencyType = req.body.Competencie || 'competència';
  const templateName = req.body.templateName || '';

  const filePath = req.file.path;
  let csvRows = [];

  fs.createReadStream(filePath)
    .pipe(csv({ headers: ['Column1', 'Column2', 'Column3'], skipLines: 0 }))
    .on('data', (row) => {
      csvRows.push(row);
    })
    .on('end', async () => {
      try {
        const jsonData = processCsvData(csvRows, subjectType, competencyType);
        console.log("JSON processat:", JSON.stringify(jsonData, null, 2));
        await CompetenciesModel.insertData(jsonData, templateName);
        res.status(200).json({ message: 'Dades importades correctament', data: jsonData });
      } catch (error) {
        res.status(500).json({ error: error.message });
      } finally {
        fs.unlinkSync(filePath);
      }
    });
};

function processCsvData(csvRows, subjectType, competencyType) {
  let result = [];
  let currentSubject = null;

  csvRows.forEach(row => {
    const c1 = row['Column1'] ? row['Column1'].trim() : '';
    const c2 = row['Column2'] ? row['Column2'].trim() : '';
    const c3 = row['Column3'] ? row['Column3'].trim() : '';

    if (c1 && c1.toUpperCase().includes("COMPETÈNCIES")) {
      return;
    }

    if (c1) {
      currentSubject = {
        materia: c1,
        type: subjectType,
        Competencies: []  
      };
      result.push(currentSubject);
      return;
    }

    if (currentSubject) {
      if (c2) {
        let newCompetency = {
          descripcio: c2,
          type: competencyType,
          Criteris: []
        };
        if (c3) {
          newCompetency.Criteris.push(c3);
        }
        currentSubject.Competencies.push(newCompetency);
      } else if (!c2 && c3) {
        if (currentSubject.Competencies.length > 0) {
          let lastCompetency = currentSubject.Competencies[currentSubject.Competencies.length - 1];
          lastCompetency.Criteris.push(c3);
        }
      }
    }
  });
  return result;
}
