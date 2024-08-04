import { ethers } from 'ethers';

const Navigation = ({ account, setAccount, setSearchTerm }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className='nav__brand'>
        <h1>Ticket Chain</h1>
        <input
          id='searchInput'
          className='nav__search'
          type="text"
          placeholder='Find millions of experiences'
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <ul className='nav__links'>
          <li><p>Concerts</p></li>
          <li><p>Sports</p></li>
          <li><p>Arts & Theater</p></li>
          <li><p>More</p></li>
        </ul>
      </div>
      {account ? (
        <button type="button" className='nav__connect'>
          {account.slice(0, 4) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className='nav__connect' onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;