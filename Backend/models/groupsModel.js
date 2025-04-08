// models/groupsModel.js
const { poolPromise } = require("../config/db");

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
    throw new Error("Array of group UUIDs required");
  }

  const uuidList = groupUUIDs.map(uuid => `'${uuid}'`).join(",");

  const query = `
    SELECT 
      st.Name AS SubjectName,
      comp.Description AS CompetencyDescription,
      comp.OrderBy AS OrderByComp,
      ct.Description AS CriteriaDescription,
      ct.OrderByMain AS OrderByMainCriteria,
      ct.OrderBy AS OrderByCriteria,
      SUM(CASE WHEN cs.Worked = 1 THEN 1 ELSE 0 END) AS WorkedCount
    FROM dbo.CriteriaSDA cs
    INNER JOIN dbo.CriteriaTPL ct
      ON cs.UUIDCriteria = ct.UUID
    INNER JOIN dbo.SDA sda
      ON cs.UUIDSDA = sda.UUID 
      AND sda.UUIDGroup IN (${uuidList})
    INNER JOIN dbo.CompetenciesTPL comp
      ON ct.UUIDCompetencie = comp.UUID
    INNER JOIN dbo.SubjectsTPL st
      ON comp.UUIDSubject = st.UUID
    GROUP BY 
      st.Name,
      comp.Description,
      comp.OrderBy,
      ct.Description,
      ct.OrderByMain,
      ct.OrderBy,
      ct.UUID,
      ct.UUIDCompetencie,
      comp.UUIDSubject
    ORDER BY WorkedCount;
  `;

  const result = await pool.request().query(query);
  return result.recordset;
}

module.exports = {
  getGroupsByUserUUID,
  getResumeForGroups,
};
