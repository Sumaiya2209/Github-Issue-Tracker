document.getElementById("signin_btn").addEventListener('click', function(){

  const userName = document.getElementById("userName").value;
  const password =document.getElementById('password').value;

  if(userName === "admin" && password === "admin123"){
    window.location.assign("home.html");
  }
  else{
    alert("Invalid Username or Password. Please try again.");
    pin.value = "";
  }
})

console.log("hi")