const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");

const form = document.getElementById("cardForm");
const continueBtn = document.getElementById("continueBtn");

const cardName = document.querySelector(".card-name");
const cardNumber = document.querySelector(".card-number");
const cardDate = document.querySelector(".card-date");
const cardCvc = document.querySelector(".card-cvc");

const completeSection = document.querySelector(".complete");
const formSection = document.querySelector("form");

const nameError = document.querySelector(".name-error");
const numberError = document.querySelector(".number-error");
const dateError = document.querySelector(".date-error");
const cvcError = document.querySelector(".cvc-error");

nameInput.addEventListener("input", function () {
  if (nameInput.value === "") {
    cardName.textContent = "JANE APPLESEED";
  } else {
    cardName.textContent = nameInput.value.toUpperCase();
  }
});

numberInput.addEventListener("input", function () {
  let value = numberInput.value;

  let cleaned = "";
  for (let i = 0; i < value.length; i++) {
    if (!isNaN(value[i]) && value[i] !== " ") {
      cleaned += value[i];
    }
  }

  let formatted = "";
  for (let i = 0; i < cleaned.length; i++) {
    formatted += cleaned[i];
    if ((i + 1) % 4 === 0 && i !== cleaned.length - 1) {
      formatted += " ";
    }
  }

  numberInput.value = formatted;

  if (formatted === "") {
    cardNumber.textContent = "0000 0000 0000 0000";
  } else {
    cardNumber.textContent = formatted;
  }
});

monthInput.addEventListener("input", updateDate);
yearInput.addEventListener("input", updateDate);

function updateDate() {
  let month = monthInput.value || "00";
  let year = yearInput.value || "00";
  cardDate.textContent = month + "/" + year;
}

cvcInput.addEventListener("input", function () {
  if (cvcInput.value === "") {
    cardCvc.textContent = "000";
  } else {
    cardCvc.textContent = cvcInput.value;
  }
});


form.addEventListener("submit", function (e) {
  e.preventDefault();

  let hasError = false;

  clearErrors();

  if (nameInput.value.trim() === "") {
    showError(nameInput, nameError, "Can't be blank");
    hasError = true;
  }

  let numberOnly = numberInput.value.replaceAll(" ", "");
  if (numberOnly === "") {
    showError(numberInput, numberError, "Can't be blank");
    hasError = true;
  } else if (numberOnly.length !== 16) {
    showError(numberInput, numberError, "Must be 16 digits");
    hasError = true;
  }

  if (monthInput.value === "" || yearInput.value === "") {
    showError(monthInput, dateError, "Can't be blank");
    hasError = true;
  } else {
    let monthNum = parseInt(monthInput.value);
    if (monthNum < 1 || monthNum > 12) {
      showError(monthInput, dateError, "Invalid month");
      hasError = true;
    }
  }

  if (cvcInput.value === "") {
    showError(cvcInput, cvcError, "Can't be blank");
    hasError = true;
  } else if (cvcInput.value.length !== 3) {
    showError(cvcInput, cvcError, "Must be 3 digits");
    hasError = true;
  }

  if (!hasError) {
    formSection.classList.add("hidden");
    completeSection.classList.remove("hidden");
  }
});

continueBtn.addEventListener("click", function () {
  form.reset();
  clearErrors();

  cardName.textContent = "JANE APPLESEED";
  cardNumber.textContent = "0000 0000 0000 0000";
  cardDate.textContent = "00/00";
  cardCvc.textContent = "000";

  completeSection.classList.add("hidden");
  formSection.classList.remove("hidden");
});

function showError(input, errorElement, message) {
  input.classList.add("input-error");
  errorElement.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(el => el.textContent = "");
  document.querySelectorAll("input").forEach(input =>
    input.classList.remove("input-error")
  );
}