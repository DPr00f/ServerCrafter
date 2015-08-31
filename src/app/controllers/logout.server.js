class LogoutController {
  logout(req, res) {
    req.session = null;
    res.redirect('/');
  }
}

export default new LogoutController();
