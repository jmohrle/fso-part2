const Course = ({ course }) => {

  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => {
  return (
    <div>
      {props.parts.map((prop) => {
        return <Part key={prop.id} part={prop} />
      })}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => <p><b>total of {props.total} exercises</b></p>


export default Course