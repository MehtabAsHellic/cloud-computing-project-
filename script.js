const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

updateBigCup();

smallCups.forEach((cup, idx) => {
    cup.addEventListener("click", () => highlightCups(idx));
});

function highlightCups(idx) {
    if (idx === 7 && smallCups[idx].classList.contains("full")) idx--;
    else if (
        smallCups[idx].classList.contains("full") &&
        !smallCups[idx].nextElementSibling.classList.contains("full")
    ) {
        idx--;
    }

    smallCups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add("full");
        } else {
            cup.classList.remove("full");
        }
    });

    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll(".cup-small.full").length;
    const totalCups = smallCups.length;

    if (fullCups === 0) {
        percentage.style.visibility = "hidden";
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = "visible";
        percentage.style.height = `${(fullCups / totalCups) * 330}px`;
        percentage.innerText = `${(fullCups / totalCups) * 100}%`;
    }

    if (fullCups === totalCups) {
        remained.style.visibility = "hidden";
        remained.style.height = 0;
    } else {
        remained.style.visibility = "visible";
        liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
    }
}

const netBathInput = document.getElementById("netBathInput");
const addNetBathBtn = document.getElementById("addNetBath");

addNetBathBtn.addEventListener("click", () => {
    const netBathValue = parseFloat(netBathInput.value);
    // Update water consumption calculations and UI elements based on netBathValue
});

addNetBathBtn.addEventListener("click", () => {
    console.log("Add Net Bath button clicked");
});

addNetBathBtn.addEventListener("click", () => {
    const netBathValue = parseFloat(netBathInput.value);

    // Validate the input
    if (isNaN(netBathValue) || netBathValue < 0 || netBathValue > 2) {
        alert("Please enter a valid number between 0 and 2");
        return;
    }

    // Calculate the new remained liters
    const currentRemained = parseFloat(liters.innerText);
    const newRemained = currentRemained - netBathValue;

    if (newRemained < 0) {
        alert("Too much water added! It exceeds the total capacity.");
        return;
    }

    // Update the display values
    liters.innerText = `${newRemained.toFixed(2)}L`;

    // Update the percentage height based on the new level
    const totalCapacity = 2; // Total capacity in liters
    const newPercentage = (1 - newRemained / totalCapacity) * 330;
    percentage.style.height = `${newPercentage}px`;
    percentage.innerText = `${((1 - newRemained / totalCapacity) * 100).toFixed(2)}%`;
});

