import './App.css';
import Wrapper from './Components/Wrapper'
// import Title from './Components/Title'
import Results from './Components/Results'
import Footer from './Components/Footer'


function App() {
  return (
    <>
      <Wrapper>
        {/* <Title title="The shoppies" /> */}
        <Results />
      </Wrapper>
      <Footer />
    </>
  );
}

export default App;
