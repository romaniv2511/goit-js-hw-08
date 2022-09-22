import throttle from 'lodash.throttle';
import storage from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE = "feedback-form-state";
const formData = {};

initPage();

const onFormInput = e => {
    const { name, value } = e.target;
    formData[name] = value;

    storage.save(LOCAL_STORAGE, formData);
    
}
const throttedOnFormInput = throttle(onFormInput, 500);

formRef.addEventListener('input', throttedOnFormInput);


function initPage() {
    const parseData = storage.load(LOCAL_STORAGE);
    if (!LOCAL_STORAGE) {
        return;
    }
    Object.entries(parseData).forEach(( [name, value] ) => {
        formRef.elements[name].value = value;
    });
}


const onFormSubmit = e => { 
    e.preventDefault();

    const { email, message } = e.currentTarget;
    console.log({email: email.value, message: message.value});

    e.currentTarget.reset();
    storage.remove(LOCAL_STORAGE);
};

formRef.addEventListener('submit', onFormSubmit);