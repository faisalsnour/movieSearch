import './App.css';
import Wrapper from './Components/Wrapper'
import Title from './Components/Title'
// import Search from './Components/Search'
import Results from './Components/Results'

function App() {
  return (
    <Wrapper>
      <Title title="The shoppies" />
      {/* <Search /> */}
      <Results />
    </Wrapper>
  );
}

export default App;
