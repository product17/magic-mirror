import express from 'express';
import path from 'path';
import presenter from './presenter';

const app = express();

app.set('views', path.join(__dirname, '../../../server/app/views'));

app.get('/', presenter);

export default app;
