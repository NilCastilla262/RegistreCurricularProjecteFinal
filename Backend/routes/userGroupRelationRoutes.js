// routes/userGroupRelationRoutes.js
import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { requireCenterAdmin } from "../middlewares/centerAdminMiddleware.js";
import { getGroupsByUserController, getUsersByGroupController, createUserGroupRelationController, deleteUserGroupRelationController} from "../controllers/userGroupRelationController.js";

const router = Router();

router.get( "/user/:uuid", verifyToken, requireCenterAdmin, getGroupsByUserController);

router.get( "/group/:uuid", verifyToken, requireCenterAdmin, getUsersByGroupController);

router.put( "/", verifyToken, requireCenterAdmin, createUserGroupRelationController);

router.delete( "/:userUUID/:groupUUID",  verifyToken, requireCenterAdmin, deleteUserGroupRelationController);

export default router;
