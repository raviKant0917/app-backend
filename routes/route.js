import express from 'express';
import { getMembers,getTeams,postMembers,postTeams } from '../controller/get.js';

const router =express.Router(); 

router.get("/teams",getTeams);
router.get("/members",getMembers);

router.post("/teams",postTeams);
router.post("/members",postMembers);

// routes.post("/")

export default router;