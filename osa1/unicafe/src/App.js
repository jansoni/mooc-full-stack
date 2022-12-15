import React, { useState } from 'react'

const Statistics = (props) => {
  let positive, average = 0; 
  let all = props.data[0] + props.data[1] + props.data[2]
  if (props.data[1] == 0 && props.data[2] == 0) {
    positive = props.data[0] * 100
    average = props.data[0]
  } else {
    positive = (props.data[0] / (props.data[0] + props.data[1] + props.data[2])) * 100
    average =  (props.data[0] - props.data[2]) / (props.data[0] + props.data[1] + props.data[2])
  }

  return(
    <div>
      <Statisticline text="good" value={props.data[0]}/>
      <Statisticline text="neutral" value={props.data[1]}/>
      <Statisticline text="bad" value={props.data[2]}/>
      <Statisticline text="all" value={all}/>
      <Statisticline text="average" value={average.toFixed(1)}/>
      <Statisticline text="positive" value={positive.toFixed(1) + "%"}/>
    </div>
  )
}

const Button = (props) => {
  return(
    <div>
      <button onClick={props.func_one}>{props.text_one}</button>
      <button onClick={props.func_two}>{props.text_two}</button>
      <button onClick={props.func_three}>{props.text_three}</button>
    </div>
  )

}

const Display = (props) => {
  return(
    <h1>{props.header}</h1>
  )
}

const Statisticline = (props) => {
  return (
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
          </tr>
        </tbody>
      </table>
  )
}

const App = () => {
  const headers = ["give feedback", "statistics", "No feedback given"]

  const [good = 0, setGood] = useState(0)
  const [neutral = 0, setNeutral] = useState(0)
  const [bad = 0, setBad] = useState(0)

  const good_add = () => setGood(good + 1)
  const neutral_add = () => setNeutral(neutral + 1)
  const bad_add = () => setBad(bad + 1)

  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <div>
        <Display header={headers[0]}/>
        <Button
          func_one={good_add} text_one={"good"}
          func_two={neutral_add} text_two={"neutral"}
          func_three={bad_add} text_three={"bad"}
        />
        <Display header={headers[1]}/>
        <p>{headers[2]}</p>
      </div>
    )
  } else {
    return (
      <div>
        <Display header={headers[0]}/>
        <Button
          func_one={good_add} text_one={"good"}
          func_two={neutral_add} text_two={"neutral"}
          func_three={bad_add} text_three={"bad"}
        />
        <Display header={headers[1]}/>
        <Statistics data={[good, neutral, bad]}/>
      </div>
    )
  }
}

export default App;
