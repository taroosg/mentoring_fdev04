import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const Record = props => {
  const { id } = props.match.params;

  const [record, setRecord] = useState([]);
  // const [totalCost, setTotalCost] = useState('');

  useEffect(() => {
    const record = firebase.firestore().collection('posts').doc(id);
    // 更新イベント監視
    record
      .get()
      .then(doc => {
        console.log(doc.data());
        setRecord(
          {
            ...doc.data(),
            total: doc.data().costs.map(x => Number(x.cost)).reduce((pre, now) => pre + now),
            duration: Math.ceil((doc.data().created_at.seconds - doc.data().started_at.seconds) / 60 / 60 / 24),
          }
        )
        // setRecord(doc.data().costs.map(x => Number(x.cost)).reduce((pre, now) => pre + now));
      })
  }, [id])

  return (
    <fieldset>
      <legend>データ詳細</legend>
      <p>documentId: {id}</p>
      {/* <p>{JSON.stringify(record)}</p> */}
      <p>相手： {record.title}</p>
      <p>期間： {record.duration}</p>
      <p>総額： {record.total}</p>
      {/* <ul>詳細： {JSON.stringify(record.costs)}</ul> */}
      <ul>詳細： {record.costs && record.costs.map((x, index) => <li key={index}>{JSON.stringify(x)}</li>)}</ul>
    </fieldset>
  )
}

export default Record;