import {Router} from 'express';
import organisations from './organisations'
const router = Router();

router.use('/organizations', organisations);

export default router;