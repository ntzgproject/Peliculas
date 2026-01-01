document.addEventListener("DOMContentLoaded", () => {
    
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if(email !== "" && password !== "") {
            alert("¡Estas logueado!");
        } else {
            alert("Debes ingresar un email y una contraseña");
        }
    });
});