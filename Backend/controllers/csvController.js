//controllers/csvController.js
const fs = require('fs');
const csv = require('csv-parser');
const CompetenciesModel = require('../models/competenciesModel');

exports.uploadCsv = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No s\'ha enviat cap fitxer' });
  }
  
  const filePath = req.file.path;
  let csvRows = [];

  // Si el teu CSV no té headers, pots definir-los manualment
  fs.createReadStream(filePath)
    .pipe(csv({ headers: ['Column1', 'Column2', 'Column3'], skipLines: 0 }))
    .on('data', (row) => {
      csvRows.push(row);
    })
    .on('end', async () => {
      try {
        const jsonData = processCsvData(csvRows);
        await CompetenciesModel.insertData(jsonData);
        res.status(200).json({ message: 'Dades importades correctament', data: jsonData });
      } catch (error) {
        res.status(500).json({ error: error.message });
      } finally {
        fs.unlinkSync(filePath);
      }
    });
};

function processCsvData(csvRows) {
  let result = [];
  let currentSubject = null;

  csvRows.forEach(row => {
    const c1 = row['Column1'] ? row['Column1'].trim() : '';
    const c2 = row['Column2'] ? row['Column2'].trim() : '';
    const c3 = row['Column3'] ? row['Column3'].trim() : '';

    // Si la fila és un header (per exemple, "COMPETÈNCIES ESPECÍFIQUES" o "COMPETÈNCIES TRANSVERSALS")
    if (c1 && c1.toUpperCase().includes("COMPETÈNCIES")) {
      // Podries, si cal, actualitzar algun valor global, però aquí només l'ignorarem
      return;
    }

    // Si Column1 té text, es defineix una nova Materia
    if (c1) {
      currentSubject = {
        materia: c1,
        tipus: 'específica', // pots modificar-ho si necessites determinar el tipus
        Competencies: []   // aquí guardarem els objectes competency
      };
      result.push(currentSubject);
      return;
    }

    // Si Column1 està buit i tenim un subjecte actual, processem la informació de Competencies
    if (currentSubject) {
      if (c2) {
        // Si Column2 té text, és una nova competency
        let newCompetency = {
          descripcio: c2,
          Criteris: []
        };
        if (c3) {
          newCompetency.Criteris.push(c3);
        }
        currentSubject.Competencies.push(newCompetency);
      } else if (!c2 && c3) {
        // Si Column2 està buit però Column3 té text, afegim aquest text com a criteri a l'última competency
        if (currentSubject.Competencies.length > 0) {
          let lastCompetency = currentSubject.Competencies[currentSubject.Competencies.length - 1];
          lastCompetency.Criteris.push(c3);
        }
      }
    }
  });
  console.log("JSON processat:", JSON.stringify(result, null, 2));
  //return result;
  return null;
}
