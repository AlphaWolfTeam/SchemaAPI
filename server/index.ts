import mongoose from 'mongoose';
import Server from './server';
import config from './config';

(async () => {
  await mongoose.connect(
    `mongodb://${config.dev.db.host}:${config.dev.db.port}/${config.dev.db.name}`,
    { useNewUrlParser: true, useFindAndModify: false },
  );

  console.log(`[MongoDB] connected to port ${config.dev.db.port}`);
  console.log('Starting server');
  const server: Server = Server.bootstrap();

  server.app.on('close', () => {
    mongoose.disconnect();
    console.log('Server closed');
  });
})();
