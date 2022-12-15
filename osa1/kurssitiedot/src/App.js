
const Header = (props) => {
  return (
    <div>
      <h1>{ props.data.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name ={props.data.parts[0].name} exercises={props.data.parts[0].exercises}/>
      <Part name ={props.data.parts[1].name} exercises={props.data.parts[1].exercises}/>
      <Part name ={props.data.parts[2].name} exercises={props.data.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  let ans = 0;
  props.data.parts.forEach(element => {
    ans += element.exercises;
  });

  return (
    <div>
      <p>
        Number of exercises {ans}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header data = {course}/>
      <Content data = {course}/>
      <Total data = {course}/>
    </div>
  )
}

export default App;
