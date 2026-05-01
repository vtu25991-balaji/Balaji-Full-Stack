document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedbackForm");
    const nameInput = document.getElementById("username");
    const emailInput = document.getElementById("useremail");
    const msgInput = document.getElementById("usermessage");
    const submitBtn = document.getElementById("submitBtn");
    
    // Reusable validation logic as per requirements
    const validateLength = (val, min) => val.trim().length >= min;
    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    const handleValidation = (inputElem, validator, errMsgId) => {
        const isValid = validator(inputElem.value);
        const errorElem = document.getElementById(errMsgId);
        
        if (inputElem.value.trim() === '') {
            inputElem.classList.remove('valid', 'invalid');
            errorElem.style.display = 'none';
        } else if (isValid) {
            inputElem.classList.remove('invalid');
            inputElem.classList.add('valid');
            errorElem.style.display = 'none';
        } else {
            inputElem.classList.remove('valid');
            inputElem.classList.add('invalid');
            errorElem.style.display = 'block';
        }
        return isValid;
    };

    // Highlight fields on mouse hover as per requirements
    const inputs = [nameInput, emailInput, msgInput];
    inputs.forEach(input => {
        input.addEventListener("mouseenter", () => input.classList.add("hovered"));
        input.addEventListener("mouseleave", () => input.classList.remove("hovered"));
    });

    // Validate inputs on keypress (keyup is better for realtime capturing what was added)
    nameInput.addEventListener("keyup", () => handleValidation(nameInput, val => validateLength(val, 3), "nameMsg"));
    emailInput.addEventListener("keyup", () => handleValidation(emailInput, validateEmail, "emailMsg"));
    msgInput.addEventListener("keyup", () => handleValidation(msgInput, val => validateLength(val, 1), "msgMsg"));

    // Instruction: double click to submit. Clicking once should not submit.
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Prompting user to double click
        let hint = submitBtn.querySelector('.hint');
        hint.style.color = '#ff4d4f';
        setTimeout(() => hint.style.color = '', 1000);
    });

    // Show confirmation on double-click submit
    submitBtn.addEventListener("dblclick", (e) => {
        e.preventDefault();
        
        const isNameValid = handleValidation(nameInput, val => validateLength(val, 3), "nameMsg");
        const isEmailValid = handleValidation(emailInput, validateEmail, "emailMsg");
        const isMsgValid = handleValidation(msgInput, val => validateLength(val, 1), "msgMsg");

        if (isNameValid && isEmailValid && isMsgValid) {
            document.getElementById("successOverlay").classList.remove("hidden");
        }
    });

    document.getElementById("closeOverlayBtn").addEventListener("click", () => {
        document.getElementById("successOverlay").classList.add("hidden");
        form.reset();
        inputs.forEach(input => input.classList.remove("valid", "invalid"));
    });
});
