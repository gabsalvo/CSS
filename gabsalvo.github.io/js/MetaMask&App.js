//variables
const meta = document.querySelector(".metamask");
const provider = new ethers.providers.Web3Provider(ethereum);
const actionBSC = document.querySelector(".actionBSC");
const actionETH = document.querySelector(".actionETH");
const resultBSC = document.getElementById("resultBSC");
const resultETH = document.getElementById("resultETH");

//MetaMask Connection
const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        meta.innerHTML='No Web-Wallet Detected';
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      meta.innerHTML=`Connected to: ${accounts[0]}`
    } catch (error) {
      console.log(error)
    }
  }

connectWallet();
actionBSC.addEventListener("click", async () => {
  const { chainId } = await provider.getNetwork();
  if(chainId === 1){
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0x38",
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          chainName: "Smart Chain Mainnet",
          nativeCurrency: {
              name: "BINANCE",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://bscscan.com"]
      }]
   });
  }
  provider.getBlockNumber().then(function(blockNumber){
    provider.getBlock(blockNumber).then(function(block){
        const miner = block.miner;
        resultBSC.innerHTML=
         ` 
                                                                           
           | Blockchain : BSC                                               
           |
           |                                                                
           | Latest Block mined : ${blockNumber}                            
           |
           |                                                                
           | Miner Address: ${miner}                                        
           |
           
            ` 
        ;
    })
  });
});

actionETH.addEventListener("click", async () => {
  const { chainId } = await provider.getNetwork();
  if(chainId === 56){
    ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{
         chainId: "0x1"
      }]
   })
  }
  provider.getBlockNumber().then(function(blockNumber){
    provider.getBlock(blockNumber).then(function(block){
        const miner = block.miner;
        resultBSC.innerHTML=
         ` 
                                                                           
           | Blockchain : ETH                                              
           |
           |                                                                
           | Latest Block mined : ${blockNumber}                            
           |
           |                                                                
           | Miner Address: ${miner}                                        
           |
           
            ` 
        ;
    })
  });
});