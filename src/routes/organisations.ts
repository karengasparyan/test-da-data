import {Router} from "express";
import Organisations from '../controllers/Organisations';
const router = Router();

router.get("/", Organisations.organizations);

export default router;