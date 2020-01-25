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
        {/* <br /> */}
        {!this.state.user ?
          (<SignInScreen />) :
          <BrowserRouter>
            <div>
              {/* <Route exact path='/' component={SignInScreen} /> */}
              <Route path='/' render={props => <Main user={this.state.user} logout={() => this.logout()} />} />
              {/* <Route path='/create' render={props => <Create user={this.state.user} />} />
          <Route path='/read' render={props => <Read user={this.state.user} />} /> */}
              {/* <Route path='/friends' component={Friends} /> */}
            </div>
          </BrowserRouter>
        }
      </div>
    );
  }
}

export default App;