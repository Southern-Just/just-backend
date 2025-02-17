import {Router} from 'express';

const membershipRouter = Router();

membershipRouter.get('/', (req,res)=> res.send({title:' GET all memberships'}));

membershipRouter.get('/:id', (req,res)=> res.send({title:' GET membership details'}));

membershipRouter.post('/', (req,res)=> res.send({title:' CREATE membership'}));

membershipRouter.put('/:id', (req,res)=> res.send({title:' UPDATE membership'}));

membershipRouter.delete('/:id', (req,res)=> res.send({title:' DELETE membership'}));

membershipRouter.get('/user/:id', (req,res)=> res.send({title:' GET all user memberships'}));

membershipRouter.get('/:id/cancel', (req,res)=> res.send({title:' CANCEL membership'}));


membershipRouter.get('/upcoming-renewals', (req,res)=> res.send({title:' GET upcoming renewals'}));


export default membershipRouter;