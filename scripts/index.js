const form = document.querySelector("form[name='contact-form']");
const thankYou = document.querySelector(".thank-you");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
// const phoneInput = document.querySelector("input[name='phone']");
const messageInput = document.querySelector("textarea[name='message']");

nameInput.isValid = () => !!nameInput.value;
emailInput.isValid = () => isValidEmail(emailInput.value);
// phoneInput.isValid = () => isValidPhone(phoneInput.value);
messageInput.isValid = () => !!messageInput.value;

const inputFields = [nameInput, emailInput, messageInput];

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// const isValidPhone = (phone) => {
//   const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
//   return re.test(String(phone).toLowerCase());
// };

let shouldValidate = false;
let isFormValid = false;

const validateInputs = () => {
  if (!shouldValidate) return;

  isFormValid = true;
  inputFields.forEach((input) => {
    input.classList.remove("invalid");
    input.nextElementSibling.classList.add("hide");

    if (!input.isValid()) {
      input.classList.add("invalid");
      isFormValid = false;
      input.nextElementSibling.classList.remove("hide");
    }
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();  
  //console.log("Form Submitted");
   console.log('Name: ', nameInput.value);
   console.log('Email: ', emailInput.value);
  //  console.log('Phone: ', phoneInput.value);
   console.log('Message: ', messageInput.value);
  shouldValidate = true;
  validateInputs();
  if (isFormValid) {
    form.remove();
    thankYou.classList.remove("hide");
    // TODO: DO AJAX REQUEST
    
    const { name, email, message } = event.target;

    const endpoint = "https://b7qpn630b5.execute-api.us-east-1.amazonaws.com/default/rashmiSendContactEmail";
    
    const body = JSON.stringify({
        senderName: name.value,
        senderEmail: email.value,
        message: message.value
      });
      const requestOptions = {
        method: "POST",
        body
      };
      fetch(endpoint, requestOptions)
        .then((response) => {
          if(!response.ok) throw new Error("Error in fetch");
          return response.json();
        })
        .then((response) => {
          document.getElementById("result-text").innerText = 
            "Email sent successfully!";
        })
        .catch((error) => {
          document.getElementById("result-text").innerText =
            "An unkown error occured.";
        });
      }
});

inputFields.forEach((input) => input.addEventListener("input", validateInputs));