document.addEventListener('DOMContentLoaded', function() {
    // --- 1. DEFINISI ELEMEN (SELECTORS) ---
    // Sidebar Elements
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

    // Form Inputs (Kanan)
    const inputBio = document.getElementById('inputBio');
    const inputEmail = document.getElementById('inputEmail');
    const inputPhone = document.getElementById('inputPhone');
    const inputAddress = document.getElementById('inputAddress');
    
    // Tombol Aksi
    const actionButtons = document.getElementById('actionButtons');
    const btnSave = document.getElementById('btnSave');
    const btnCancel = document.getElementById('btnCancel');

    // Kumpulan input di form kanan untuk di-loop
    const rightSideInputs = [inputBio, inputEmail, inputPhone, inputAddress];

    // --- 2. FUNGSI LOAD DATA (DARI STORAGE) ---
    function loadData() {
        // Ambil data dari sessionStorage
        const storedData = JSON.parse(sessionStorage.getItem('ngunyahHubProfile'));
        
        // Data Default jika belum ada yang tersimpan
        let data = storedData || {
            name: "Unknown",
            username: "@Unknown",
            bio: "Unknown",
            email: "Unknown@ngunyahhub.com",
            phone: "081234567890",
            address: "Unknown",
            photo: "https://via.placeholder.com/300"
        };

        // Tampilkan Data ke Elemen Teks (View Mode)
        displayName.textContent = data.name;
        displayUsername.textContent = data.username;
        displayProfilePic.src = data.photo;

        // Isi Nilai Input (Persiapan Edit Mode)
        inputName.value = data.name;
        inputUsernameHandle.value = data.username;
        inputBio.value = data.bio;
        inputEmail.value = data.email;
        inputPhone.value = data.phone;
        inputAddress.value = data.address;
    }

    // Panggil fungsi load saat halaman pertama kali dibuka
    loadData();

    // --- 3. FUNGSI MENGATUR MODE (EDIT / VIEW) ---
    function setEditMode(isEdit) {
        if (isEdit) {
            // === MASUK MODE EDIT ===
            // Sidebar: Sembunyikan teks, munculkan input nama & ikon kamera
            nameTextGroup.style.display = 'none';
            nameInputGroup.style.display = 'block';
            cameraIcon.style.display = 'block';
            btnEditProfile.style.display = 'none'; // Sembunyikan tombol "Edit profile"

            // Form Kanan: Aktifkan input (hapus disabled) & munculkan tombol aksi
            rightSideInputs.forEach(input => input.disabled = false);
            actionButtons.style.display = 'flex';

        } else {
            // === KELUAR MODE EDIT (KEMBALI KE VIEW) ===
            // Sidebar: Munculkan teks, sembunyikan input nama & ikon kamera
            nameTextGroup.style.display = 'block';
            nameInputGroup.style.display = 'none';
            cameraIcon.style.display = 'none';
            btnEditProfile.style.display = 'flex'; // Munculkan kembali tombol "Edit profile"

            // Form Kanan: Matikan input (tambah disabled) & sembunyikan tombol aksi
            rightSideInputs.forEach(input => input.disabled = true);
            actionButtons.style.display = 'none';
        }
    }

    // --- 4. EVENT LISTENERS (INTERAKSI TOMBOL) ---

    // Klik Tombol "Edit profile"
    btnEditProfile.addEventListener('click', function() {
        setEditMode(true); // Aktifkan mode edit
    });

    // Klik Tombol "Batal"
    btnCancel.addEventListener('click', function() {
        loadData(); // Reset data ke kondisi terakhir disimpan
        setEditMode(false); // Kembali ke mode view
    });

    // Klik Tombol "Simpan Perubahan"
    btnSave.addEventListener('click', function() {
        // Buat objek data baru dari nilai input saat ini
        const newData = {
            name: inputName.value,
            username: inputUsernameHandle.value,
            bio: inputBio.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            address: inputAddress.value,
            photo: displayProfilePic.src // Ambil sumber foto yang sedang tampil
        };

        // Simpan objek data ke sessionStorage (ubah jadi string JSON)
        sessionStorage.setItem('ngunyahHubProfile', JSON.stringify(newData));
        
        alert('Perubahan berhasil disimpan!');

        // Refresh tampilan dengan data baru & kembali ke mode view
        loadData();
        setEditMode(false);
    });

    // Event Ganti File Foto (Preview)
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            // Saat file selesai dibaca, ubah src gambar profil
            reader.onload = function(evt) {
                displayProfilePic.src = evt.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});