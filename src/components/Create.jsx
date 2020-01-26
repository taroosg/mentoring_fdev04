import React, { useState, useReducer } from 'react';
import firebase from '../firebase';

const Create = props => {

  // 日付ソート用の関数
  const compare = (a, b) => {
    const dateA = a.date.toUpperCase();
    const dateB = b.date.toUpperCase();
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison * -1;
  }

  // ステート管理
  const [title, setTitle] = useState('');
  const [started_at, setStarted_at] = useState('');
  const [question01, setQuestion01] = useState('');
  const [question02, setQuestion02] = useState('');
  const [question03, setQuestion03] = useState('');
  const [costs, setCosts] = useState([]);
  const [costInput, setCostInput] = useReducer(
    (state, newState) =>
      ({ ...state, ...newState }),
    {
      cost: '',
      date: '',
    }
  );

  // コスト入力値の管理
  const handleChangeCost = event => {
    const name = event.target.name;
    const value = event.target.value;
    setCostInput({ [name]: value });
  }

  // コスト追加処理
  const addCost = event => {
    event.preventDefault();
    setCosts([...costs, costInput].sort(compare))
    console.log(costs);
    setCostInput({ cost: '', date: '' });
  }

  // コスト削除処理
  const removeCost = index => {
    setCosts([...costs].filter((x, i) => i !== index));
  }

  // データ送信処理
  const submitData = event => {
    console.log(costs, question01, question02, question03);
    const firestore = firebase.firestore();
    firestore.collection('posts').add({
      title: title,
      started_at: new Date(`${started_at}T00:00:00`),
      question01: question01,
      question02: question02,
      question03: question03,
      costs: costs,
      // created_at: new Date(),
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      user_id: props.user.uid,
    }).then(result => {
      console.log(result)
      window.location.href = `/read/${result.id}`;
    });
  }

  return (
    <fieldset>
      <legend>データ作成</legend>
      <p>uid: {props.user.uid}</p>
      <form action="">
        <div>
          <label htmlFor="title">title</label>
          <input type="text" id="title" name="title" onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="started_at">started_at</label>
          <input type="date" id="started_at" name="started_at" onChange={e => setStarted_at(e.target.value)} />
        </div>

        <div>
          <p>Q1</p>
          <input type="radio" id="q1_1" name="question01" value="React" onChange={e => setQuestion01(e.target.value)} />
          <label htmlFor="q1_1">React</label>
          <input type="radio" id="q1_2" name="question01" value="Vue" onChange={e => setQuestion01(e.target.value)} />
          <label htmlFor="q1_2">Vue</label>
          <input type="radio" id="q1_3" name="question01" value="Anguler" onChange={e => setQuestion01(e.target.value)} />
          <label htmlFor="q1_3">Anguler</label>
        </div>

        <div>
          <p>Q2</p>
          <input type="radio" id="q2_1" name="question02" value="Laravel" onChange={e => setQuestion02(e.target.value)} />
          <label htmlFor="q2_1">Laravel</label>
          <input type="radio" id="q2_2" name="question02" value="CakePHP" onChange={e => setQuestion02(e.target.value)} />
          <label htmlFor="q2_2">CakePHP</label>
          <input type="radio" id="q2_3" name="question02" value="Symfony" onChange={e => setQuestion02(e.target.value)} />
          <label htmlFor="q2_3">Symfony</label>
        </div>

        <div>
          <p>Q3</p>
          <input type="radio" id="q3_1" name="question03" value="Haskell" onChange={e => setQuestion03(e.target.value)} />
          <label htmlFor="q3_1">Haskell</label>
          <input type="radio" id="q3_2" name="question03" value="Scala" onChange={e => setQuestion03(e.target.value)} />
          <label htmlFor="q3_2">Scala</label>
          <input type="radio" id="q3_3" name="question03" value="F#" onChange={e => setQuestion03(e.target.value)} />
          <label htmlFor="q3_3">F#</label>
        </div>

        <div>
          <p>Costs</p>
          <input type="date" name="date" value={costInput.date} onChange={handleChangeCost} />
          <input type="number" name="cost" value={costInput.cost} onChange={handleChangeCost} />
          <button type='button' onClick={addCost}>add</button>
        </div>

        <div>
          <button type='button' onClick={submitData}>submit</button>
        </div>
      </form>
      {
        costs.length === 0 ? ''
          : <table>
            <tbody>
              <tr>
                <th>date</th>
                <th>cost</th>
                <th></th>
              </tr>
              {costs.map((x, index) => {
                return (
                  <tr key={index}>
                    <td>{x.date}</td>
                    <td>{x.cost}</td>
                    <td><button onClick={() => removeCost(index)}>delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      }
    </fieldset>
  )
}

export default Create;