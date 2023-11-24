import { usePrint } from "./react-use-print/index";

export default function App() {
  const { isPrint, print } = usePrint();

  function printNow() {
    print();
  }

  return (
    <div className="App">
      {isPrint ? <h1>Print</h1> : <h1>Screen</h1>}

      <button onClick={printNow}>Print</button>
    </div>
  );
}
