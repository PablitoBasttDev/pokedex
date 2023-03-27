import { Card } from './Card.jsx'

const id = []
for(let i=1; i<300; i++){
  id.push(i)
}
console.log(id)

function App() {
  
    return(
      <main>
        {
          id.map(num=>{
            return <Card key={num} id={num}/>
          })
        }              
      </main>
    )     
}

export default App
