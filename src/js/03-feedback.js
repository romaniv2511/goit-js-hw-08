import throttle from 'lodash.throttle';
import storage from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE = "feedback-form-state";

startPage();

const onFormInput = e => {
    const { name, value } = e.target;


    let savedData = storage.load(LOCAL_STORAGE);
    savedData = savedData ? savedData : {};

    savedData[name] = value;

    storage.save(LOCAL_STORAGE, savedData);
    
}
const throttedOnFormInput = throttle(onFormInput, 500);

formRef.addEventListener('input', throttedOnFormInput);

function startPage() {
    const loadedData = storage.load(LOCAL_STORAGE);
    if (!loadedData) {
        return;
    }
    Object.entries(loadedData).forEach(([name, value]) => {
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