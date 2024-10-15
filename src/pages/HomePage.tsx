import { useCounter } from '../hooks/useCounter';

function HomePage() {
  const { counterValue, incrementCount, decrementCount } = useCounter();

  return (
    <div>
      <button onClick={incrementCount}>Increment</button>
      {counterValue}
      <button onClick={decrementCount}>Decrement</button>
    </div>
  );
}

export default HomePage;
