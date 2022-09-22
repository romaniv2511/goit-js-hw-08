import throttle from 'lodash.throttle';
import storage from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE = "feedback-form-state";
const formData = {};

initPage();

const onFormInput = e => {
    const { name, value } = e.target;
    formData[name] = value;

    storage.save(LOCALE_STORAGE, formData);
    
}
const throttedOnFormInput = throttle(onFormInput, 500);

formRef.addEventListener('input', throttedOnFormInput);


function initPage() {
    if (!LOCALE_STORAGE) {
        return;
    }
    const parseData = storage.load(LOCALE_STORAGE);
    Object.entries(parseData).forEach(( [name, value] ) => {
        formRef.elements[name].value = value;
    });
}


const onFormSubmit = e => { 
    e.preventDefault();

    const { email, message } = e.currentTarget;
    console.log({email: email.value, message: message.value})

    e.currentTarget.reset();
    storage.remove(LOCALE_STORAGE);
};

formRef.addEventListener('submit', onFormSubmit);