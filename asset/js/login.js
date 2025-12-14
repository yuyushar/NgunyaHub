function clearSignupFields() {
    document.getElementById("email").value = "";
    document.getElementById("newUser").value = "";
    document.getElementById("newPass").value = "";
    document.getElementById("confirmPass").value = "";
}

function showSignup() {
    clearSignupFields();
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('signupBox').style.display = 'block';
}

function clearLoginFields() {
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPass").value = "";
}

function showLogin() {
    clearLoginFields();
    document.getElementById('signupBox').style.display = 'none';
    document.getElementById('loginBox').style.display = 'block';
}

function signup() {
    let email = document.getElementById("email").value;
    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;
    let confirm = document.getElementById("confirmPass").value;
    let msg = document.getElementById("signupMsg");

    msg.style.color = "red";

    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const passPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!emailPattern.test(email)) {
        msg.textContent = "Format email tidak valid!";
        return;
    }

    if (!user.trim()) {
        msg.textContent = "Username tidak boleh kosong!";
        return;
    }

    if (!passPattern.test(pass)) {
        msg.textContent =
            "Password minimal 8 karakter, mengandung huruf dan angka.";
        return;
    }

    if (pass !== confirm) {
        msg.textContent = "Passwords do not match!";
        return;
    }

    sessionStorage.setItem("email", email);
    sessionStorage.setItem("username", user);
    sessionStorage.setItem("password", pass);

    msg.style.color = "green";
    msg.textContent = "Akun berhasil dibuat! Silakan login.";

    setTimeout(() => {
        msg.textContent = "";
        clearLoginFields();
        showLogin();
    }, 1000);
}

function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;
    let msg = document.getElementById("loginMsg");

    let storedUser = sessionStorage.getItem("username");
    let storedPass = sessionStorage.getItem("password");

    if (user === storedUser && pass === storedPass) {
        msg.style.color = "green";
        msg.textContent = "Login berhasil!";
        setTimeout(() => {
            window.location.href = "beranda.html";
        }, 500);
    } else {
        msg.style.color = "red";
        msg.textContent = "Username atau password salah!";
        document.getElementById("loginPass").value = "";
    }
}


function togglePassword(id, eyeIcon) {
    let field = document.getElementById(id);
    if (field.type === "password") {
        field.type = "text";
        eyeIcon.textContent = "🙈";
    } else {
        field.type = "password";
        eyeIcon.textContent = "👁️";
    }
}