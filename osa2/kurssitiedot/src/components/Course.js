
const Header = ({ data }) => {
  return (
    <h1>{data.name}</h1>
  )
}

const Content = ({ data }) => {
  return (
    <div>
        {data.parts.map(part => 
          <p key={part.id}>{part.name} {part.exercises}</p>   
        )}
    </div>
  )
}

const Total = ({ data }) => {
  let total = 0
  data.parts.forEach(element => {
    total += element.exercises
  });
  return (
      <strong>total of {total} exercises </strong>
  )
}

const Course = ({ courses })  => {
    const data = courses
    return (
      <div>
        <h1>Web development curriculum</h1>
        {data.map(course =>
        <div key={course.id}>
          <Header data={course}/>
          <Content data={course}/>
          <Total data={course}/>
        </div>
        )}
      </div>
    )
}

export default Course 