import React from 'react';
import ReactDOM from 'react-dom/server';
import Mirror from '../components/Mirror';

// Setup Components
const MirrorComponent = React.createFactory(Mirror);

export default function mirror (req, res) {
  res.render('index', {
    reactApp: ReactDOM.renderToString(MirrorComponent({})),
    client_data: {},
  });
}
