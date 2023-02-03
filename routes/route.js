import express from 'express';
import { getMembers,getTeams,postMembers,postTeams } from '../controller/get.js';
import { getUsers,postUsers,patchUser, deleteUser,getUsersByName} from '../controller/User-controller.js';

const router =express.Router(); 

router.get("/teams",getTeams);
router.get("/members",getMembers);
router.get("/users",getUsers);
// router.get("/users/:id",getUserById);
router.get("/users/:name",getUsersByName);

router.post("/teams",postTeams);
router.post("/members",postMembers);
router.post("/users",postUsers);

router.patch("/users/:id",patchUser);
router.delete("/users/:id",deleteUser);

export default router;