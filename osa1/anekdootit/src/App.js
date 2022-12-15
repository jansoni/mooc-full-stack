import { useState } from 'react'

const Button = (props) => {
  return ( 
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Score = (props) => {
  return (
    <p>has {props.score}</p>
  )
}

const App = () => {
  const initial_score = [0, 0, 0, 0, 0, 0, 0]
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const headers = ["Anecdote with most votes", "Anecdote of the day"]
  const [selected = 0, setSelected] = useState(0)
  const [score, addScore] = useState(initial_score)

  const random_post = () => setSelected(Math.floor(Math.random() * 7))
  const vote = () => { 
    addScore(item => {
      return [
        ...item.slice(0, selected),
        item[selected] + 1,
        ...item.slice(selected + 1),
      ]
    })
  }

  const indexFinder = () => {
    let ans = 0
    let most_votes = Math.max(...score)
    for (let index = 0; index < score.length; index++) {
      if (most_votes == score[index]) {
        ans = index
        break
      }
    }
    return ans
  }

  return (
    <div>
      <Display text={headers[1]}/>
      <p>{anecdotes[selected]}</p>
      <Score score={score[selected]}/>
      <div>
        <Button handleClick={vote} text="vote"/>
        <Button handleClick={random_post} text="next anecdote"/>
        <Display text={headers[0]}/>
        <p>{anecdotes[indexFinder()]}</p>
        <Score score={score[indexFinder()]}/>
      </div>
    </div>
  )
}

export default App