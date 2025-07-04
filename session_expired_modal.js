// session_expired_modal.js
//<script src="session_expired_modal.js"></script>

// Create modal styles
const modalStyles = `
#sessionModal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}
#sessionModalContent {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    font-family: sans-serif;
}
#sessionModalContent h2 {
    margin-top: 0;
    font-size: 20px;
}
#sessionModalContent input {
    width: 100%;
    padding: 8px;
    margin: 6px 0;
    box-sizing: border-box;
}
#sessionModalContent button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
#sessionModalContent button:hover {
    background: #0056b3;
}
`;

// Inject styles
const styleTag = document.createElement('style');
styleTag.innerText = modalStyles;
document.head.appendChild(styleTag);

// Create modal structure
const modal = document.createElement('div');
modal.id = 'sessionModal';
modal.style.display = 'none';

modal.innerHTML = `
    <div id="sessionModalContent">
        <h2>Session Expired</h2>
        <input type="text" id="usernameField" placeholder="Username" />
        <input type="password" id="passwordField" placeholder="Password" />
        <button id="submitSessionBtn">Submit</button>
    </div>
`;

document.body.appendChild(modal);

// Show modal after 5 seconds
setTimeout(() => {
    modal.style.display = 'flex';
}, 5000);

// Handle submission (safe, ethical logging only)
document.getElementById('submitSessionBtn').addEventListener('click', () => {
    const username = document.getElementById('usernameField').value;
    const password = document.getElementById('passwordField').value;

    console.log(`[SIMULATION] User entered Username: ${username} | Password: ${password}`);
    alert('Session reauthentication simulated. Check console for logged values.');

    modal.style.display = 'none';
});