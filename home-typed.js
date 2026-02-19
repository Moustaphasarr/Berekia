document.addEventListener("DOMContentLoaded", function () {
    var target = document.getElementById("hero-typed-text");
    if (!target) return;

    var phrases = [
        "Formateur en Prise de Parole",
        "Leadership & Performance",
        "Coaching Professionnel",
        "Sante Mentale",
        "Sport & Discipline"
    ];
    var lineIndex = 0;
    var charIndex = 0;
    var currentLine = null;
    var typingSpeed = 40;
    var lineDelay = 280;

    function typeNextChar() {
        if (lineIndex >= phrases.length) return;

        if (!currentLine) {
            currentLine = document.createElement("div");
            currentLine.className = "typed-line";
            target.appendChild(currentLine);
        }
        currentLine.classList.add("is-typing");

        var phrase = phrases[lineIndex];
        currentLine.textContent += phrase.charAt(charIndex);
        charIndex += 1;

        if (charIndex < phrase.length) {
            setTimeout(typeNextChar, typingSpeed);
            return;
        }

        currentLine.classList.remove("is-typing");
        lineIndex += 1;
        charIndex = 0;
        var finishedLine = currentLine;
        currentLine = null;

        if (lineIndex < phrases.length) {
            setTimeout(typeNextChar, lineDelay);
        } else if (finishedLine) {
            finishedLine.classList.remove("is-typing");
        }
    }

    setTimeout(typeNextChar, 220);
});
