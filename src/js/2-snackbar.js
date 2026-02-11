// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form=document.querySelector(".form")
const inputMs=document.querySelector(`input[name="delay"]`)
function createPromise({selectedState, delay}){
	return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(selectedState==='fulfilled') {
					resolve(delay)
				} else {
					reject(delay)
				}
			}, delay);
  });
}

const onSuccess=(delay)=>{
iziToast.success({
    title: 'Resolve',
	position: 'topRight',
	timeout: delay,
    message: `✅ Fulfilled promise in ${delay}ms`
});
}
const onError=(delay)=>{
iziToast.error({
    title: 'Rejected',
	position: 'topRight',
	timeout: delay,
    message: `❌ Rejected promise in ${delay}ms`
});}

const handleSubmit = (event)=>{
event.preventDefault();
const selectedState = form.elements.state.value;
const delay = form.elements.delay.value;
  createPromise({selectedState, delay})
	.then(delay =>
		onSuccess(delay)) 
	.catch(delay => onError(delay));
event.currentTarget.reset();
}


form.addEventListener('submit', handleSubmit);














/*const handleSubmit = ({evn, delay})=>{
evn.preventDefault();
    return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(shouldResolve) {
					resolve(value)
				} else {
					reject(value)
				}
			}, delay);
  });
}
handleSubmit({ value: "A", delay: inputMs.textContent })
	.then(value => console.log(value)) 
	.catch(error => console.log(error));
/*const makePromise = ({ value, delay, shouldResolve = true }) => {
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(shouldResolve) {
					resolve(value)
				} else {
					reject(value)
				}
			}, delay);
  });
};

makePromise({ value: "A", delay: 1000 })
	.then(value => console.log(value)) // "A"
	.catch(error => console.log(error));

makePromise({ value: "B", delay: 3000 })
	.then(value => console.log(value)) // "B"
	.catch(error => console.log(error));

makePromise({ value: "C", delay: 2000, shouldResolve: false })
	.then(value => console.log(value)) 
	.catch(error => console.log(error)); // "C"*/
