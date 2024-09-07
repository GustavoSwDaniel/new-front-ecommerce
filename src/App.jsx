import Routers from './routes'
import { LoadingProvider } from './context/LoadingContext'

function App() {
  return (
   <>
    <LoadingProvider>
      <Routers/>
    </LoadingProvider>
    </>
  );
}

export default App;
