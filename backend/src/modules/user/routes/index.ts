import { Router } from 'express';
import controller from '../controllers';
import { IUser } from '../database/interfaces';

const BASE_URL = '/user';
const routes = Router();

routes.post(`${BASE_URL}/`, (req, res) => {
  const user = req.body;
  console.log(user);
  controller
    .post(user)
    .then((response) => {
      res.status(response.code).json({ ...response });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Something is wrong. Please retry again' });
    });
});

routes.get(`${BASE_URL}/`, (req, res) => {
  controller
    .list()
    .then((response) => {
      res.status(response.code).json({ ...response });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Something is wrong. Please retry again' });
    });
});

routes.get(`${BASE_URL}/:id`, (req, res) => {
  const { id } = req.params as { id: string };
  controller
    .get(id)
    .then((response) => {
      res.status(response.code).json({ ...response });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Something is wrong. Please retry again' });
    });
});

routes.put(`${BASE_URL}/:id`, (req, res) => {
  const userId = req.params.id;
  const user: Partial<IUser> = req.body;

  controller
    .put(userId, user)
    .then((response) => {
      res.status(response.code).json({ ...response });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Something is wrong. Please retry again' });
    });
});

routes.delete(`${BASE_URL}/:id`, (req, res) => {
  const { id } = req.params as { id: string };
  controller
    .remove(id)
    .then((response) => {
      res.status(response.code).json({ ...response });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Something is wrong. Please retry again' });
    });
});

export default routes;
