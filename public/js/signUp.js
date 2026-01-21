const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn =document.getElementById('submit');

submitBtn.addEventListener('click',(e)=>{
    if(password.value.length<=8){
        e.preventDefault();
        alert("Password must be of length 8");
    }
})