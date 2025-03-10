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

  fs.createReadStream(filePath)
    .pipe(csv())
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
  let currentMateria = null;
  let currentCompetencia = null;

  csvRows.forEach(row => {
    const cell1 = row['Column1'] ? row['Column1'].trim() : '';
    const cell2 = row['Column2'] ? row['Column2'].trim() : '';
    const cell3 = row['Column3'] ? row['Column3'].trim() : '';

    if (cell1 && !cell2 && (!cell3 || cell3 === '')) {
      const tipus = cell1.includes('Transversals') ? 'transversal' : 'específica';
      currentMateria = {
        materia: cell1,
        tipus: tipus,
        competències: []
      };
      result.push(currentMateria);
      currentCompetencia = null;
    }
    else if (cell1 && /^\d+\./.test(cell1)) {
      currentCompetencia = {
        titol: cell1,
        criteris: []
      };
      if (cell2) currentCompetencia.criteris.push(cell2);
      if (currentMateria) {
        currentMateria.competències.push(currentCompetencia);
      }
    }
    else if ((!cell1 || cell1 === '') && cell2) {
      if (currentCompetencia) {
        currentCompetencia.criteris.push(cell2);
      }
    }
  });
  console.log(result);
  //return result;
  return null;
}
