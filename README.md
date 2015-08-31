# ServerCrafter (WIP)

# Database
To install the database go into sequelize (`cd sequelize`) folder and type `sequelize db:migrate`

# Start development
Install `gulp` and `bower` globally
```
sudo npm install -g gulp bower
```

Install all dependencies
```
npm install && bower install
```

Most likely npm install will require admin permissions

In that case use `sudo npm install`

Build and run
```
npm start
```

From `npm start` onwards, the `js`, `jsx` will make the client side to compile and/or the server to restart.
