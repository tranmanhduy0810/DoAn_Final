window.onload = function () {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    const checkbox = document.getElementById("hs-default-checkbox");

    if (savedUsername && savedPassword) {
        document.getElementById("forUsername").value = savedUsername;
        document.getElementById("forPassword").value = savedPassword;
        checkbox.checked = true;
    }
};

function saveLoginDetails(event) {
    const username = document.getElementById("forUsername").value;
    const password = document.getElementById("forPassword").value;
    const checkbox = document.getElementById("hs-default-checkbox");

    if (checkbox.checked) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
    } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }

    return true; 
}