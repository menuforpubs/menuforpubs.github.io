import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'utils/history.utils';

import Header from 'components/Header/Header';
import CategoriesGrid from 'components/CategoriesGrid/CategoriesGrid';
import EditorSection from 'components/EditorSection/EditorSection';
import Settings from 'components/Settings/Settings';

import { withPageView } from 'hocs/withPageView';

const CategoriesGridWithPageView = withPageView(CategoriesGrid);
const EditorSectionWithPageView = withPageView(EditorSection);

export const Routes = () => (
  <Router history={history}>
    <Route path="/:pubName/:path" component={Header} />
    <Switch>
      <Route exact path="/">
        <Redirect to="/pubList" />
      </Route>
      <Route path="/:pubName/menu" component={CategoriesGridWithPageView} />
      <Route
        exact
        path="/:pubName/section/:path"
        component={EditorSectionWithPageView}
      />
      <Route path="/:pubName/settings" component={Settings} />
    </Switch>
  </Router>
);

export default Routes;
