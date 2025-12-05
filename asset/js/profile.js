document.addEventListener('DOMContentLoaded', function() {
    // --- 1. SELECTORS ---
    const nameTextGroup = document.getElementById('nameTextGroup');
    const displayName = document.getElementById('displayName');
    const displayUsername = document.getElementById('displayUsername');
    
    const nameInputGroup = document.getElementById('nameInputGroup');
    const inputName = document.getElementById('inputName');
    const inputUsernameHandle = document.getElementById('inputUsernameHandle');
    
    const displayProfilePic = document.getElementById('displayProfilePic');
    const cameraIcon = document.getElementById('cameraIcon');
    const fileInput = document.getElementById('fileInput');
    const btnEditProfile = document.getElementById('btnEditProfile');

    const inputBio = document.getElementById('inputBio');
    const inputEmail = document.getElementById('inputEmail');
    const inputPhone = document.getElementById('inputPhone');
    const inputAddress = document.getElementById('inputAddress');
    
    const actionButtons = document.getElementById('actionButtons');
    const btnSave = document.getElementById('btnSave');
    const btnCancel = document.getElementById('btnCancel');

    const rightSideInputs = [inputBio, inputEmail, inputPhone, inputAddress];

    // --- 2. LOAD DATA ---
    function loadData() {
        const storedData = JSON.parse(sessionStorage.getItem('ngunyahHubProfile'));

        // Cek login/signup dari sessionStorage (diset oleh index.html)
        const loginUsername = sessionStorage.getItem('username'); 
        const loginEmail = sessionStorage.getItem('email');

        let data = storedData || {
            name: "Unknown",
            username: "@Unknown",
            // Ubah default text menjadi string kosong agar Placeholder muncul
            bio: "", 
            email: "",
            phone: "",
            address: "",
            photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        };

        // Pembersihan Data Lama: Jika data tersimpan masih berupa teks default lama, 
        // kita kosongkan agar fitur placeholder berfungsi.
        if (data.bio === "Tolong isi bio kamu.") data.bio = "";
        if (data.email === "Tolong isi email kamu.") data.email = "";
        if (data.phone === "Tolong isi nomor telepon kamu.") data.phone = "";
        if (data.address === "Tolong isi alamat kamu.") data.address = "";

        // Prioritaskan data login/signup jika ada
        if (loginUsername) {
            data.username = loginUsername.startsWith('@') ? loginUsername : '@' + loginUsername;
        }
        if (loginEmail) {
            data.email = loginEmail;
        }

        // Terapkan ke UI
        displayName.textContent = data.name;
        displayUsername.textContent = data.username;
        displayProfilePic.src = data.photo;

        inputName.value = data.name;
        inputUsernameHandle.value = data.username.startsWith('@') ? data.username.slice(1) : data.username;
        
        // Value input diset dari data. Jika data kosong (""), maka placeholder di HTML akan muncul otomatis
        inputBio.value = data.bio;
        inputEmail.value = data.email;
        inputPhone.value = data.phone;
        inputAddress.value = data.address;
    }

    loadData();

    // --- 3. TOGGLE EDIT MODE ---
    function setEditMode(isEdit) {
        if (isEdit) {
            // Mode Edit
            nameTextGroup.style.display = 'none';
            nameInputGroup.style.display = 'block';
            cameraIcon.style.display = 'flex'; 
            btnEditProfile.style.display = 'none';
            rightSideInputs.forEach(input => input.disabled = false);
            actionButtons.style.display = 'flex';
        } else {
            // Mode View
            nameTextGroup.style.display = 'block';
            nameInputGroup.style.display = 'none';
            cameraIcon.style.display = 'none';
            btnEditProfile.style.display = 'flex';
            rightSideInputs.forEach(input => input.disabled = true);
            actionButtons.style.display = 'none';
        }
    }

    // --- 4. EVENTS ---
    btnEditProfile.addEventListener('click', () => setEditMode(true));
    btnCancel.addEventListener('click', () => {
        loadData();
        setEditMode(false);
    });
    
    btnSave.addEventListener('click', () => {
        const newData = {
            name: inputName.value,
            username: inputUsernameHandle.value,
            bio: inputBio.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            address: inputAddress.value,
            photo: displayProfilePic.src
        };
        sessionStorage.setItem('ngunyahHubProfile', JSON.stringify(newData));
        
        // Update juga session login agar sinkron
        if (newData.username) {
            sessionStorage.setItem('username', newData.username.startsWith('@') ? newData.username.slice(1) : newData.username);
        }
        if (newData.email) {
            sessionStorage.setItem('email', newData.email);
        }
        alert('Perubahan berhasil disimpan!');
        loadData();
        setEditMode(false);
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => displayProfilePic.src = evt.target.result;
            reader.readAsDataURL(file);
        }
    });
});