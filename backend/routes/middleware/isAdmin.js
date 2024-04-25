
const isAdmin = (req, res, next) => {

    if (req.user.admin) {
      next();
    } else {
      res.status(403).json({ error: 'No eres Administrador' });
    }
  }

export default isAdmin;