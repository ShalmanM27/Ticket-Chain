const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  console.log(`Deploying contracts with the account: ${deployer.address}`)
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy the contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.target}\n`)

  // List out the 5 events
  const occasions = [
    {
      name: "Jr.India Dance Show",
      cost: tokens(2),
      tickets: 150,
      date: "Aug 18",
      time: "1:00PM IST",
      location: "Mumbai, India"
    },
    {
      name: "National Chess Championship",
      cost: tokens(1.5),
      tickets: 0,
      date: "Feb 28",
      time: "9:00AM IST",
      location: "Delhi, India"
    },
    {
      name: "Global Talents Show",
      cost: tokens(0.25),
      tickets: 180,
      date: "Jul 11",
      time: "10:00AM TRT",
      location: "Turkey, Istanbul"
    },
    {
      name: "T20 World Cup",
      cost: tokens(5),
      tickets: 0,
      date: "Apr 04",
      time: "3:00PM CST",
      location: "Washington, USA"
    },
    {
      name: "F1 Grand Race",
      cost: tokens(1.5),
      tickets: 200,
      date: "Jun 23",
      time: "01:00AM EST",
      location: "Toronto, Canada"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}  

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});