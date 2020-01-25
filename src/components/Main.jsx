import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Create from './Create';
import Read from './Read';
import Record from './Record';

const Main = props => {
  const data = props
  console.log(data);
  return (
    <div>
      <BrowserRouter>
        <fieldset>
          <legend>menu</legend>
          <ul>
            <li><button onClick={() => props.logout()}>ログアウト</button></li>
            <li><Link to='/main/read'>一覧を見る</Link></li>
            <li><Link to='/main/create'>データをつくる</Link></li>
          </ul>
        </fieldset>
        <div>
          <Route exact path='/main/read' render={props => <Read user={data.user} />} />
          <Route path='/main/create' render={props => <Create user={data.user} />} />
          <Route path='/main/read/:id' component={Record} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Main;