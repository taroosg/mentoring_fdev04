import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import firebase from '../firebase';

const Read = props => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const posts = firebase.firestore().collection('posts')
    // const toDay = new Date();
    // 更新イベント監視
    posts
      .where('user_id', '==', props.user.uid)
      .orderBy('started_at', 'desc')
      .onSnapshot(query => {
        const responseData = [...query.docs].map(x => {
          return {
            id: x.id,
            data: {
              ...x.data(),
              total: x.data().costs.map(x => Number(x.cost)).reduce((pre, now) => pre + now),
              // duration: Math.ceil(((toDay.getTime() / 1000) - x.data().started_at.seconds) / 60 / 60 / 24),
              duration: Math.ceil((x.data().created_at.seconds - x.data().started_at.seconds) / 60 / 60 / 24),
            },
          }
        });
        setData(responseData);
      })
    // useEffectの外から持ってきた値は↓のように初期化する必がある
  }, [props])

  const deleteRecord = docId => {
    const record = firebase.firestore().collection('posts').doc(docId);
    record.delete()
      .then(() => {
        console.log('deleted');
      })
  }

  return (
    <fieldset>
      <legend>データ一覧</legend>
      <ul>
        {data.map((x, index) => {
          return (
            <fieldset key={index} id={x.id}>
              <legend>
                {x.data.title}
                <button onClick={() => { deleteRecord(x.id) }}>削除</button>
              </legend>
              <p>totalCost (¥): {x.data.total}</p>
              <p>duration: {x.data.duration}</p>
              <p>cost / day (¥): {x.data.total / x.data.duration}</p>
              <Link to={`/read/${x.id}`} >詳細</Link>
            </fieldset>
            // <li key={index} id={x.id}>
            //   <p>title: {x.data.title}</p>
            //   <p>totalCost (¥): {x.data.total}</p>
            //   <p>duration: {x.data.duration}</p>
            //   <p>cost / day (¥): {x.data.total / x.data.duration}</p>
            //   {/* <p><span onClick={() => { }}>☓</span>{JSON.stringify(x.data)}</p> */}
            //   <Link to={`/read/${x.id}`} query={() => { deleteRecord() }}>詳細</Link>
            //   <button onClick={() => { deleteRecord(x.id) }}>削除</button>
            // </li>
          );
        })}
      </ul>

    </fieldset>
  )

}

export default Read;