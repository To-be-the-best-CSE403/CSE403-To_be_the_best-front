import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {

  return (
    <div className="App">
     <h1>ToBeTheBest</h1>
     <button onClick={() => window.open('https://tobethebest.vercel.app', '_blank')}>
      Website
     </button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
