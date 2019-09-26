import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {withContext} from './Context';
import PrivateRoute from './PrivateRoute';

import Dashboard from './dashboard';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import Students from './components/Students';
import About from './components/About';
import Board from './components/Board';
import PostCreate from './components/PostCreate';
import PostDetail from './components/PostDetail';
import PostUpdate from './components/PostUpdate';
import Footer from './components/Footer';
import Page404 from './components/Page404';
import Page403 from './components/Page403';
import Page500 from './components/Page500';



const DashBoardWithContext = withContext(Dashboard);
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);
const SignOutWithContext = withContext(SignOut);
const StudentsWithContext = withContext(Students);
const BoardWithContext = withContext(Board);
const PostCreateWithContext = withContext(PostCreate);
const PostDetailWithContext = withContext(PostDetail);
const PostUpdateWithContext = withContext(PostUpdate);
const HeaderWithContext = withContext(Header);


function App() {
  return (
    <Router>
      <div className="App">
        <HeaderWithContext />
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/" component={DashBoardWithContext}/>
            <Route path="/signin" component={SignInWithContext}/>
            <Route path="/signup" component={SignUpWithContext}/>
            <Route path="/signout" component={SignOutWithContext}/>
            <Route path="/posts/create" component={PostCreateWithContext}/>
            <Route exact path="/posts/:id" component={PostDetailWithContext}/>
            <Route path="/posts/:id/update" component={PostUpdateWithContext}/>
            <Route path="/about" component={About}/>
            <PrivateRoute path="/board" component={BoardWithContext}/>
            <Route path="/error" component={Page500}/>
            <Route path="/forbidden" component={Page403}/>
            <Route component={Page404}/>
          </Switch>
        </div>
        <Footer />

      </div>
    </Router>

  );
}

export default App;
