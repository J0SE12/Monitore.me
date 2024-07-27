import { Router } from 'express';

const router = Router();

router.get('/example', (req, res) => {
  res.send('This is an example route');
});

export default router; // Exporta o módulo padrão


