import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import Layout from '../templates/Layout';

const App = () => (
  <Layout>
    {renderRoutes(routes)}
  </Layout>
);

export default App;
