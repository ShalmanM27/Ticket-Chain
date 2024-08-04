import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navigation from './components/Navigation';
import Card from './components/Card';
import Sort from './components/Sort';
import TokenMaster from './abis/TokenMaster.json';
import SeatChart from './components/SeatChart';

const address = "Your address";
alert("The web App is loading,\n       Kindly wait....\n(it may take up to 15 seconds)");

function App() {
  const [acc, setAcc] = useState(null);
  const [provid, setProvid] = useState(null);
  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [occasion, setOccasion] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  async function loadBlockchain() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvid(provider);
      console.log(provider);

      const tokenMaster = new ethers.Contract(address, TokenMaster, provider);
      setTokenMaster(tokenMaster);
      
      const totalOccasions = await tokenMaster.totalOccasions();
      const occasions = [];

      for (let i = 1; i <= totalOccasions; i++) {
        const occasion = await tokenMaster.getOccasion(i);
        occasions.push(occasion);
      }

      setOccasions(occasions);

      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0]);
        setAcc(account);
      });
    } catch (error) {
      console.error("Error loading blockchain data:", error);
    }
  }

  useEffect(() => {
    loadBlockchain();
  }, []);

  const filteredOccasions = searchTerm
    ? occasions.filter(occasion => occasion.name.toLowerCase().includes(searchTerm))
    : occasions;

  return (
    <div>
      <header>
        <Navigation account={acc} setAccount={setAcc} setSearchTerm={setSearchTerm} />
        <h2 className='header__title'>Event Tickets</h2>
      </header>
      <Sort />
      <div className='cards'>
        {filteredOccasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index} />
        ))}
      </div>

      {toggle && (
        <SeatChart occasion={occasion} tokenMaster={tokenMaster} provider={provid} setToggle={setToggle} acc={acc}/>
      )}
    </div>
  );
}

export default App;