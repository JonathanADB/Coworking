import { useState } from "react";
import Logo from "../assets/images/Logo.png";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto w-fit">
      <div className="flex flex-row justify-center">
        <a href="/">
          <img src={Logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1 className="text-center">Vite + React</h1>
      <div className="text-center">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default Home;
