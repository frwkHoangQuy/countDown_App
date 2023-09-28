const { Fragment, useState, useEffect } = require("react");

function Content() {
  const [count, setCount] = useState(0)
  const [run, setRun] = useState(false)
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    if (count > 1 && run) {
      for (let i = 0; i < 100; ++i) {
        setTimeout(() => {
          setCount(count - 0.01)
        }, 10);
      }
    }
  }, [count, run, inputValue])

  const handleInputValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <Fragment>
      <input value={inputValue} onChange={handleInputValue}>
      </input>
      <button onClick={() => {
        setShow(true);
        setRun(true);
        setCount(parseFloat(inputValue) + 1);
        setInputValue('');
      }
      }>
        Start
      </button>
      <button onClick={() => {
        setRun(false);
        setShow(true);
      }
      }>
        Stop
      </button>
      {show && Math.floor(count)}
    </Fragment>
  )
}

export default Content; 