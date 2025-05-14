// routes/index.js
import { Router } from 'express';
import csvRoutes from './csvRoutes.js';
import groupsRoutes from './groupsRoutes.js';
import subjectsRoutes from './subjectsRoutes.js';
import sdaRoutes from './sdaRoutes.js';
import coursesRoutes from './coursesRoutes.js';
import sdaSubjectsRelationRoutes from './sdaSubjectsRelationRoutes.js';
import competenciesSDARoutes from './competenciesSDARoutes.js';
import fullSdaRoutes from './fullSdaRoutes.js';
import userCenterRelationRoutes from './userCenterRelationRoutes.js';
import usersRoutes from './usersRoutes.js';
import userGroupRelationRoutes from './userGroupRelationRoutes.js';

const router = Router();

router.use('/', csvRoutes);
router.use('/groups', groupsRoutes);
router.use('/subjects', subjectsRoutes);
router.use('/sda', sdaRoutes);
router.use('/courses', coursesRoutes);
router.use('/sda/subject-relation', sdaSubjectsRelationRoutes);
router.use('/sda/fillSDA', competenciesSDARoutes);
router.use('/sda/full', fullSdaRoutes);
router.use('/user-center-relations', userCenterRelationRoutes);
router.use('/users', usersRoutes);
router.use('/user-group-relations', userGroupRelationRoutes);

export default router;
