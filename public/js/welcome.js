const quotes = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "Experience is the name everyone gives to their mistakes.",
    "Debugging is like being the detective in a crime movie where you are also the murderer.",
    "Simplicity is the soul of efficiency.",
    "Before software can be reusable it first has to be usable."
];

window.addEventListener('DOMContentLoaded', () => {
    const newQuoteBtn = document.getElementById('newQuoteBtn');


    newQuoteBtn.addEventListener('click', showRandomQuote);

    function showRandomQuote() {
        newQuoteBtn.innerText = "Loading your quote...";
        newQuoteBtn.disabled = true;
        setTimeout(() => {
            const quote = quotes[Math.floor(Math.random() * quotes.length)];
            document.getElementById('quote').innerText = quote;
            newQuoteBtn.innerText = "New Quote";
            newQuoteBtn.disabled = false;
        }, 300);
    }
    showRandomQuote();
});
