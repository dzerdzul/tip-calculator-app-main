"use strict";


const billInput = document.querySelector("#bill");
const tipButton1 = document.querySelector(".splitter__tip-wrapper button:nth-of-type(1)");
const tipButton2 = document.querySelector(".splitter__tip-wrapper button:nth-of-type(2)");
const tipButton3 = document.querySelector(".splitter__tip-wrapper button:nth-of-type(3)");
const tipButton4 = document.querySelector(".splitter__tip-wrapper button:nth-of-type(4)");
const tipButton5 = document.querySelector(".splitter__tip-wrapper button:nth-of-type(5)");
const tipInput = document.querySelector(".splitter__tip-wrapper input");
const peopleInput = document.querySelector("#people");

const tipAmount = document.querySelector(".splitter__tip-amount p");
const totalAmount = document.querySelector(".splitter__total p");
const resetButton = document.querySelector(".splitter__output button");
const errorEl = document.getElementsByClassName("splitter__error");

function calculateBillFromTip(event) {
    
    for (let errorElElement of errorEl) {
        errorElElement.textContent = "";
    }
    const tipButtons = [
        tipButton1,
        tipButton2,
        tipButton3,
        tipButton4,
        tipButton5
    ];
    tipButtons.forEach(button => button.classList.remove("active"));
    billInput.classList.remove("splitter__outline");
    tipInput.classList.remove("splitter__outline");
    peopleInput.classList.remove("splitter__outline");
    
    const bill = billInput.value === "" ? "" : Number(billInput.value);
    const people = peopleInput.value === "" ? "" : Number(peopleInput.value);
    let tip;
    if (event.currentTarget.tagName === "BUTTON") {
        event.currentTarget.classList.add("active");
        tip = Number(event.currentTarget.textContent.split("%")[0]);
    } else {
        tip = event.currentTarget.value === "" ? "" : Number(event.currentTarget.value);
        if (tip === "") {
            tipAmount.textContent = `$0.00`;
            totalAmount.textContent = `$0.00`;
        }
    }

    if (validate(bill) && validate(tip) && validate(people)) {
        const percentage = tip / 100;
        const tipAmountValue = (bill / people) * percentage;
        const totalAmountValue = (bill / people) + tipAmountValue;
        tipAmount.textContent = `$${tipAmountValue.toFixed(2)}`;
        totalAmount.textContent = `$${totalAmountValue.toFixed(2)}`;
        resetButton.disabled = false;
    } else {
        const values = [
            {name: bill, element: billInput},
            {name: tip, element: tipInput},
            {name: people, element: peopleInput}
        ];
        for (let i = 0; i < values.length; i++) {
            if (!validate(values[i].name)) {
                errorEl[i].textContent = "Can't be zero or not a number";
                values[i].element.classList.add("splitter__outline");
            }
        }
    }
}

function validate(number) {
    return Number.isFinite(number) && number !== 0;
}

tipButton1.addEventListener("click", calculateBillFromTip);
tipButton2.addEventListener("click", calculateBillFromTip);
tipButton3.addEventListener("click", calculateBillFromTip);
tipButton4.addEventListener("click", calculateBillFromTip);
tipButton5.addEventListener("click", calculateBillFromTip);
tipInput.addEventListener("input", calculateBillFromTip);
tipInput.addEventListener("focus", calculateBillFromTip);

resetButton.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    billInput.classList.remove("splitter__outline");
    tipInput.classList.remove("splitter__outline");
    peopleInput.classList.remove("splitter__outline");
    const tipButtons = [
        tipButton1,
        tipButton2,
        tipButton3,
        tipButton4,
        tipButton5
    ];
    for (let errorElElement of errorEl) {
        errorElElement.textContent = "";
    }
    tipButtons.forEach(button => button.classList.remove("active"));
    tipInput.value = "";
    tipAmount.textContent = `$0.00`;
    totalAmount.textContent = `$0.00`;
    resetButton.disabled = true;
})
