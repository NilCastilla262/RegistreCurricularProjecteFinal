// routes/userGroupRelationRoutes.js
import { Router } from "express";
import { requireCenterAdmin } from "../middlewares/centerAdminMiddleware.js";
import { getGroupsByUserController, getUsersByGroupController, createUserGroupRelationController, deleteUserGroupRelationController} from "../controllers/userGroupRelationController.js";

const router = Router();

router.get( "/user/:uuid", requireCenterAdmin, getGroupsByUserController);

router.get( "/group/:uuid", requireCenterAdmin, getUsersByGroupController);

router.post( "/", requireCenterAdmin, createUserGroupRelationController);

router.delete( "/:userUUID/:groupUUID",  requireCenterAdmin, deleteUserGroupRelationController);

export default router;
