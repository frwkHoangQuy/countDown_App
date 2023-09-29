import styled from 'styled-components';
import { useState, useEffect, useRef } from "react";
function Content() {
  const [count, setCount] = useState(0);
  const [run, setRun] = useState(false);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const intervalID = useRef(null);

  useEffect(() => {
    if (count > 1 && run) {
      intervalID.current = setInterval(() => {
        setCount(prevCount => prevCount - 0.01);
      }, 10);
    } else {
      clearInterval(intervalID.current);
    }
    return () => {
      clearInterval(intervalID.current);
    };
  }, [run, count]);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <Container>
      <Title>Countdown Timer App</Title>
      <Input
        value={inputValue}
        onChange={handleInputValue}
        placeholder="Enter time (in seconds)"
      />
      <div>
        <StartButton onClick={() => {
          if (inputValue === '') {
            setShow(true);
          }
          else {
            setShow(true);
            setRun(true);
            setCount(parseFloat(inputValue) + 1);
            setInputValue('');
          }
        }}>
          Start
        </StartButton>
        <StopButton onClick={() => {
          setRun(false);
          setShow(true);
        }}>
          Stop
        </StopButton>
        <ClearButton onClick={() => {
          setRun(false);
          setCount(0);
          setShow(true);
        }}>
          Clear
        </ClearButton>
      </div>
      {show && <Timer>{Math.floor(count)}</Timer>}
    </Container>
  );
}

export default Content;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const StartButton = styled(Button)`
  background-color: #28a745;
`;

const StopButton = styled(Button)`
  background-color: #dc3545;
`;

const ClearButton = styled(Button)`
  background-color: #ffc107;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 12px;
`;

const Timer = styled.span`
  font-size: 48px;
  font-weight: bold;
`;

