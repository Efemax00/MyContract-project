
console.log("Front end script loaded");

const contractAddress = "0x49dE4E04a376D065f116b862c1A7238825Db66B6";
const contractABI = [
    {
        "inputs": [{ "internalType": "string", "name": "_message", "type": "string" }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "message",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "string", "name": "_newMessage", "type": "string" }],
        "name": "setMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let provider;
let signer;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        alert("Wallet connected: " + await signer.getAddress());
    } else {
        alert("Please install MetaMask!");
    }
}

async function getMessage() {
    if (!contract) return alert("Please connect wallet first!");
    const message = await contract.message();
    document.getElementById("displayMessage").innerText = message;
}

async function setMessage() {
    if (!contract) return alert("Please connect wallet first!");
    const newMessage = document.getElementById("newMessage").value;
    const tx = await contract.setMessage(newMessage);
    await tx.wait();
    alert("Message updated on blockchain!");
    getMessage();
}
