import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const Record = props => {
  const { id } = props.match.params;

  const [record, setRecord] = useState([]);
  // const [totalCost, setTotalCost] = useState('');

  useEffect(() => {
    const toDay = new Date();
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
            duration1: Math.ceil((doc.data().created_at.seconds - doc.data().started_at.seconds) / 60 / 60 / 24),
            duration2: Math.ceil(((toDay.getTime() / 1000) - doc.data().started_at.seconds) / 60 / 60 / 24),
          }
        )
      })
  }, [id])

  return (
    <fieldset>
      <legend>データ詳細</legend>
      {/* <p>documentId: {id}</p> */}
      {/* <p>{JSON.stringify(record)}</p> */}
      <p>title: {record.title}</p>
      <p>duration1: {record.duration1}</p>
      <p>duration2: {record.duration2}</p>
      <p>totalCost: {record.total}</p>
      <table>
        <tbody>
          <tr>
            <th>日付</th>
            <th>金額</th>
          </tr>
          {
            record.costs &&
            record.costs.map((x, index) =>
              <tr key={index}>
                <td>{x.date}</td>
                <td>{x.cost}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </fieldset>
  )
}

export default Record;