const contact = document.querySelector('form[name="contact"]');
const contactButton = contact.querySelector('button[type="submit"]');
const originalButtonText = contactButton.innerText;
const youAreOffline = 'Unavailable: You are currently offline';
if ('onLine' in navigator){
    if(!navigator.onLine) {
        contactButton.disabled = true;
        contactButton.innerText = youAreOffline;
    }
    window.addEventListener('offline', () => {
        contactButton.disabled = true;
        contactButton.innerText = youAreOffline;
    });

    window.addEventListener('online', () => {
        contactButton.disabled = false;
        contactButton.innerText = originalButtonText;
    });

}

const showValidation = (field, formValues, form) => {
    const hasValue = Boolean(formValues.get(field));
    if( !hasValue) {
        form.querySelector(`[name="${field}"]`).required = true;
    }
    return hasValue;
}

const removeRequired = (field,  form) => {
    form.querySelector(`[name="${field}"]`).required = false
}

const highlightRequired = (form) => {
    const formValues = new FormData(form);
    const required = [...form.querySelectorAll('[required]')];
    required.forEach((fieldEl) => {
        if(!formValues.get(fieldEl.name)) {
            fieldEl.classList.add('invalid');
        } else {
            fieldEl.classList.remove('invalid');
        }
    });
}

const validate = (form) => {
    const formValues = new FormData(form);
    const prefers = formValues.get("prefers");
    switch(prefers) {
        case "telephone":
            removeRequired("email", form);
           return showValidation("telephone", formValues, form);
        break;
        case "email":
        default:
            removeRequired("telephone", form);
            return  showValidation("email", formValues, form);
    }
};

contact.addEventListener('input', (e) => {
    validate(contact);
    highlightRequired(contact);
});

contact.querySelector('[type="submit"]').addEventListener('click', (e) => {
    highlightRequired(contact);
})

contact.addEventListener('submit', (e) => {
    const form = e.currentTarget
    const isValid = validate(form);
    form.reportValidity && form.reportValidity()
    highlightRequired(form);
    if(!isValid) {
        e.preventDefault();
    }
})