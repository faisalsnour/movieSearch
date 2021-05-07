import './App.css';
import Wrapper from './Components/Wrapper'
import Title from './Components/Title'
// import Search from './Components/Search'
import Results from './Components/Results'
// import Banner from './Components/Banner'
// import Example from './Components/Example'

function App() {
  return (
    <Wrapper>
      <Title title="The shoppies" />
      <Results />
      {/* <Banner /> */}

      {/* <Example /> */}
    </Wrapper>
  );
}

export default App;
