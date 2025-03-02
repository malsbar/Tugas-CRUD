document.addEventListener("DOMContentLoaded", function () {  // Menjalankan script setelah halaman dimuat sepenuhnya
    const adminForm = document.getElementById("adminForm");  // Mengambil elemen form dengan ID "adminForm"
    const adminTable = document.getElementById("adminTable");  // Mengambil elemen tabel dengan ID "adminTable"
    let admins = [];  // Array kosong untuk menyimpan daftar admin

    // Tambah Admin
    adminForm.addEventListener("submit", function (e) {  // Event listener untuk menangani submit form
        e.preventDefault();  // Mencegah refresh halaman saat form dikirim

        const name = document.getElementById("name").value.trim();  // Mengambil input nama dan menghapus spasi ekstra
        const email = document.getElementById("email").value.trim();  // Mengambil input email dan menghapus spasi ekstra
        const role = document.getElementById("role").value;  // Mengambil nilai dari dropdown role

        if (name === "" && email === "") {  // Validasi jika nama atau email kosong
            alert("Nama dan Email harus diisi!");  // Menampilkan peringatan jika ada input kosong
            return;  // Menghentikan eksekusi jika validasi gagal
        } else if (name === "") {  // Validasi jika nama kosong
            alert("Nama harus diisi!");  // Menampilkan peringatan jika nama kosong
            return;
        } else if (email === "") {  // Validasi jika email kosong
            alert("Email harus diisi!");  // Menampilkan peringatan jika email kosong
            return;
        }

        const newAdmin = { id: Date.now(), name, email, role };  // Membuat objek admin baru dengan ID unik
        admins.push(newAdmin);  // Menambahkan admin baru ke array
        renderTable();  // Memperbarui tampilan tabel
        adminForm.reset();  // Mengosongkan form setelah data ditambahkan
    });

    // Render Tabel
    function renderTable() {
        adminTable.innerHTML = "";  // Mengosongkan isi tabel sebelum mengisi ulang
        admins.forEach(admin => {  // Melakukan looping pada array admins untuk menampilkan data
            const row = document.createElement("tr");  // Membuat elemen baris tabel baru

            row.innerHTML = `
                <td>${admin.name}</td>   
                <td>${admin.email}</td>  
                <td>${admin.role}</td>  
                <td>
                    <button onclick="editAdmin(${admin.id})">Edit</button>  
                    <button onclick="deleteAdmin(${admin.id})">Hapus</button>  
                </td>
            `;
            adminTable.appendChild(row);  // Menambahkan baris baru ke tabel
        });
    }

    // Hapus Admin
    window.deleteAdmin = function (id) {  // Fungsi untuk menghapus admin berdasarkan ID
        admins = admins.filter(admin => admin.id !== id);  // Menghapus admin dengan ID yang sesuai dari array
        renderTable();  // Memperbarui tampilan tabel setelah penghapusan
    };

    // Edit Admin
    window.editAdmin = function (id) {  // Fungsi untuk mengedit admin
        const admin = admins.find(admin => admin.id === id);  // Mencari admin berdasarkan ID
        if (admin) {  // Jika admin ditemukan
            document.getElementById("name").value = admin.name;  // Mengisi kembali input nama dengan data admin
            document.getElementById("email").value = admin.email;  // Mengisi kembali input email dengan data admin
            document.getElementById("role").value = admin.role;  // Mengisi kembali input role dengan data admin
            
            // Hapus admin lama dari daftar sebelum disimpan ulang dengan perubahan
            admins = admins.filter(a => a.id !== id);  
            renderTable();  // Memperbarui tampilan tabel setelah perubahan
        }
    };
});
