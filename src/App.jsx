import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import firebase from './firebase';
import SignInScreen from './components/SignInScreen';
import Main from './components/Main';
// import Create from './components/Create';
// import Read from './components/Read';

const App1 = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userData => {
      console.log(userData);
      setLoading(false);
      setUser(userData);
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut();
    window.location.href = '/';
  }

  console.log(user);
  // if (loading) return <div>loading</div>;
  return (
    <div>
      {user && <p>Hi, {user.uid}</p>}
      {!user ?
        <SignInScreen /> :
        <BrowserRouter>
          <Route path='/' render={props => <Main user={user} logout={() => logout()} />} />
        </BrowserRouter>
      }
    </div>
  );

}


class App extends Component {
  state = {
    loading: true,
    user: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.setState({
        loading: false,
        user: user
      });
    });
  }

  logout() {
    firebase.auth().signOut();
    window.location.href = '/';
  }


  render() {
    if (this.state.loading) return <div>loading</div>;
    return (
      <div>
        {!this.state.user ?
          <SignInScreen /> :
          <BrowserRouter>
            <Route path='/' render={props => <Main user={this.state.user} logout={() => this.logout()} />} />
          </BrowserRouter>
        }
      </div>
    );
  }
}

export default App;