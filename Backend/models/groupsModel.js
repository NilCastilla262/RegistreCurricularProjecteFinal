// models/groupsModel.js
import { poolPromise } from "../config/db.js";

async function getGroupsByUserUUID(userUUID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("UUIDUser", userUUID)
    .query(`
      SELECT g.UUID, g.Name, g.CenterName, g.CourseName, g.Year
      FROM Groups g
      INNER JOIN UserGroupRelation ugr ON g.UUID = ugr.UUIDGroup
      WHERE ugr.UUIDUser = @UUIDUser
    `);

  return result.recordset;
}

async function getResumeForGroups(groupUUIDs) {
  const pool = await poolPromise;

  if (!groupUUIDs || !Array.isArray(groupUUIDs) || groupUUIDs.length === 0) {
    throw new Error("Es requereix un array de UUIDs de grups");
  }

  const uuidList = groupUUIDs.map(uuid => `'${uuid}'`).join(',');

  const query = `
    SELECT 
      [Subject],
      [CompetencyDescription],
      [OrderByCompetency],
      [CriteriaDescription],
      [OrderByMainCriteria],
      [OrderByCriteria],
      [TotalWorked]
    FROM [RegistreCurricular].[dbo].[Test]
    WHERE UUIDGroup IN (${uuidList})
    ORDER BY [Subject], [OrderByCompetency], [OrderByCriteria];
  `;

  const result = await pool.request().query(query);
  return result.recordset;
}


async function getByCenterAndYear(centerName, year) {
  const pool = await poolPromise;
  const query = `
    SELECT *
    FROM Groups
    WHERE CenterName = '${centerName}'
      AND Year       = '${year}'
  `;
  const result = await pool.request().query(query);
  return result.recordset;
}

export {
  getGroupsByUserUUID,
  getResumeForGroups,
  getByCenterAndYear,
};
