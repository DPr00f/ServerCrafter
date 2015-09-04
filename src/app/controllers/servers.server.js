class ServersController {
  render(req, res) {
    this.renderPage(req, res);
  }


  renderPage(req, res, data = {}) {
    res.render(req.url, data);
  }
}

export default new ServersController();
