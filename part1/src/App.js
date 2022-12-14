
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="#">Github</a>
    </div>
  )
}

const App = () => {

  return (
    <div>
      <h1>Nice</h1>
      <Hello name="john"/>
      <Hello name="Don"/>
      <Footer/>
    </div>
  )
}

export default App;
