import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import firebase from './firebase';
import SignInScreen from './components/SignInScreen';
import Main from './components/Main';
// import Create from './components/Create';
// import Read from './components/Read';

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

  hoge = 'fuga';

  render() {
    if (this.state.loading) return <div>loading</div>;
    return (
      <div>
        {/* Username: {this.state.user && this.state.user.displayName} */}
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