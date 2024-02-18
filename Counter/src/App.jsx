import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


const getButtonText =() => {
  if (count === 21) {
    return 'Reset for Zero';
  } else {
    return 'Increment: ';
  }
};

const handleIncrement = () => {
  if (count === 21) {
    setCount(0);
  } else {
    setCount(count+1)
  }
};

const handleDecrement = () => {
  if(count > 0) {
    setCount(count-1);
  }
}
return (
  <>
 <h1>Namaste React🙏</h1>
      <div className="card">
        <button onClick={handleIncrement}>
          {getButtonText()} {count === 21 ? '' : count}
        </button>
        <p>
          <button onClick={handleDecrement}>
            Remove: {count}
          </button>
        </p>
      </div>
      <p className="read-the-docs">
        Display Value: {count}
      </p>
      </>
)

}

export default App
