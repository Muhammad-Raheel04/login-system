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

window.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();   // show initial quote

    document.getElementById('newQuoteBtn').addEventListener('click', showRandomQuote);
});
