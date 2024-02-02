
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('tobethebest teampane injected');
  }, []);

  return (
    <div id="tobethebest-teampane-container">
      <h2>ToBeTheBest</h2>
      <button className='big button'>Create Best Team</button>
    </div>    
  )
}
