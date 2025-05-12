// models/groupsModel.js
import { getConnection } from "../config/db.js";
import sql from "mssql";

async function getGroupsByUserUUID(userUUID) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("UUIDUser", userUUID)
    .query(`
      SELECT g.UUID, g.Name, g.CenterName, g.CourseName, g.Year
      FROM Groups g
      INNER JOIN UserGroupRelation ugr ON g.UUID = ugr.UUIDGroup
      WHERE ugr.UUIDUser = @UUIDUser
      ORDER BY g.Name ASC
    `);

  return result.recordset;
}

async function getResumeForGroups(groupUUIDs) {
  const pool = await getConnection();

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
  const pool = await getConnection();
  const query = `
    SELECT *
    FROM Groups
    WHERE CenterName = '${centerName}'
      AND Year       = '${year}'
    ORDER BY Name ASC
  `;
  const result = await pool.request().query(query);
  return result.recordset;
}

async function createGroup(centerName, name, courseName, year) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("CenterName", centerName)
    .input("Name", name)
    .input("CourseName",  courseName)
    .input("Year", year)
    .query(`
      INSERT INTO Groups (Name, CenterName, CourseName, Year)
      OUTPUT INSERTED.UUID, INSERTED.Name, INSERTED.CenterName, INSERTED.CourseName, INSERTED.Year
      VALUES (@Name, @CenterName, @CourseName, @Year);
    `);
  return result.recordset[0];
}

async function updateGroupName(uuidGroup, centerName, newName) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("UUIDGroup", uuidGroup)
    .input("CenterName", centerName)
    .input("NewName", newName)
    .query(`
      UPDATE Groups
      SET Name = @NewName
      OUTPUT inserted.UUID, inserted.Name, inserted.CenterName, inserted.CourseName, inserted.Year
      WHERE UUID = @UUIDGroup
        AND CenterName = @CenterName
    `);

  return result.recordset[0];
}

export {
  getGroupsByUserUUID,
  getResumeForGroups,
  getByCenterAndYear,
  createGroup,
  updateGroupName
};
