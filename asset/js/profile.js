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
        
        let data = storedData || {
            name: "Budi Santoso",
            username: "@budi_ngunyah",
            bio: "Halo! Saya suka memesan makanan pedas. NgunyahHub membantu saya menemukan kuliner terbaik.",
            email: "budi@ngunyahhub.com",
            phone: "081234567890",
            address: "Jl. Mawar No. 12, Jakarta Selatan",
            photo: "https://via.placeholder.com/300"
        };

        displayName.textContent = data.name;
        displayUsername.textContent = data.username;
        displayProfilePic.src = data.photo;

        inputName.value = data.name;
        inputUsernameHandle.value = data.username;
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
            cameraIcon.style.display = 'block';
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