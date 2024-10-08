const express = require('express');
const axios = require('axios');
const app = express();
const port = 3012;

// Mengambil data '/users' dari API JSONPlaceholder
app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = response.data;

        let tableHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Data Users (Node.js)</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            h1 {
                text-align: center;
                color: #000000;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            table, th, td {
                border: 1px solid #ddd;
            }
            th, td {
                padding: 12px;
                text-align: left;
            }
            th {
                background-color: #4caf50;
                color: white;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
            tr:hover {
                background-color: #ddd;
                transition: background-color 0.3s ease;
            }
        </style>
        </head>
        <body>
        <h1>Data Users dari JSONPlaceholder API (Node.js)</h1>
        <table>
        <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Company</th>
        </tr>
        </thead>
        <tbody>`;

        // Looping untuk setiap user dan menambahkan ke tabel
        data.forEach(user => {
            tableHTML += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.street}, ${user.address.city}</td>
            <td>${user.phone}</td>
            <td>${user.company.name}</td>
            </tr>`;
        });

        tableHTML += `</tbody>
        </table>
        </body>
        </html>`;
        
        // Kirim respons ke browser
        res.send(tableHTML);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching data');
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
