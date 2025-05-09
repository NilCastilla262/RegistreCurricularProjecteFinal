// backend/middlewares/centerAdminMiddleware.js
function requireCenterAdmin(req, res, next) {
  if (req.user?.centerRole === 2) {
    return next();
  }
  return res.status(403).json({ error: "Accés prohibit: només admins de centre" });
}

export { requireCenterAdmin };
