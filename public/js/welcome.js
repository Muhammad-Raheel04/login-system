const quotes = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "Experience is the name everyone gives to their mistakes.",
    "Debugging is like being the detective in a crime movie where you are also the murderer.",
    "Simplicity is the soul of efficiency.",
    "Before software can be reusable it first has to be usable."
];

function showRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').innerText = quote;
}

async function getUsername() {
    try {
        const res = await fetch('/api/user'); // call backend API
        const data = await res.json();
        document.getElementById('username').innerText = data.username || "Guest";
    } catch (err) {
        console.error(err);
        document.getElementById('username').innerText = "Guest";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    getUsername();       // fetch username dynamically
    showRandomQuote();   // show initial quote

    document.getElementById('newQuoteBtn').addEventListener('click', showRandomQuote);
});
