
import { Toolbar } from './component/Toolbar';
import { FormulaBar } from './component/FormulaBar';
import { Grid } from './component/Grid';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-2">
        <h1 className=" text-lg font-semibold text-gray-800">Zeotap Assignment: google sheet clone</h1>
      </header>
      <Toolbar />
      <FormulaBar />
      <Grid />
    </div>
  );
}

export default App;