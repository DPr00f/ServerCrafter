import User from '../models/user';
import passwordHash from 'password-hash';
import Sequelize from 'sequelize';
import config from '../../config';
import SocketIOConnection from '../socket.io.connection';

class LoginController {
  login(req, res) {
    var token;
    var wrongPassword = {
      error: true,
      message: "Wrong username or password"
    };

    User.findOne({
      where: {
        $or: [
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('username')), Sequelize.fn('lower', req.body.username)),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), Sequelize.fn('lower', req.body.username))
        ]
      }
    }).then((user) => {
      if (!user || !passwordHash.verify(req.body.password, user.password_hash)) {
        return res.status(403).json(wrongPassword);
      }
      token = SocketIOConnection.instance.getToken({data: user, time: new Date()}, config.JWT_SECRET);
      req.session.token = token;
      res.json({
        token: token
      });
    });
  }
}

export default new LoginController();
