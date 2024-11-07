import { useState } from 'react';

function TestUseState() {
  var a = useState(0);

  console.log(a);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>{a[0]}</p>
      <button onClick={() => a[1]((prev) => prev + 10)}>+</button>
    </div>
  );
}

export default TestUseState;
