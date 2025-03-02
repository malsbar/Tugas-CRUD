document.addEventListener("DOMContentLoaded", function () {
    const adminForm = document.getElementById("adminForm");
    const adminTable = document.getElementById("adminTable");
    let admins = [];

    // Tambah Admin
    adminForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const name = document.getElementById("name").value.trim(); 
        const email = document.getElementById("email").value.trim();
        const role = document.getElementById("role").value;
    
        // Cek apakah nama dan email diisi
        if (name === "" && email === "") {
            alert("Nama dan Email harus diisi!");
            return;
        } else if (name === "") {
            alert("Nama harus diisi!");
            return;
        } else if (email === "") {
            alert("Email harus diisi!");
            return;
        }
    
        const newAdmin = { id: Date.now(), name, email, role };
        admins.push(newAdmin);
        renderTable();
        adminForm.reset();
    });

    // Render Tabel
    function renderTable() {
        adminTable.innerHTML = "";
        admins.forEach(admin => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${admin.name}</td>
                <td>${admin.email}</td>
                <td>${admin.role}</td>
                <td>
                    <button onclick="editAdmin(${admin.id})">Edit</button>
                    <button onclick="deleteAdmin(${admin.id})">Hapus</button>
                </td>
            `;
            adminTable.appendChild(row);
        });
    }

    // Hapus Admin
    window.deleteAdmin = function (id) {
        admins = admins.filter(admin => admin.id !== id);
        renderTable();
    };

    // Edit Admin
    window.editAdmin = function (id) {
        const admin = admins.find(admin => admin.id === id);
        if (admin) {
            document.getElementById("name").value = admin.name;
            document.getElementById("email").value = admin.email;
            document.getElementById("role").value = admin.role;
            
            // Hapus dari daftar dan perbarui setelah edit
            admins = admins.filter(a => a.id !== id);
            renderTable();
        }
    };
});