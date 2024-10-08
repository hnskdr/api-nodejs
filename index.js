const express = require('express');
const axios = require('axios');
const app = express();
const port = 3010;

// Mengambil data '/' dari API JSONPlaceholder
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const data = response.data;

        let tableHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="device-width, initial-scale=1.0">
        <title>Data Posts (Node.js)</title>
        <style>
                /* Mengatur tampilan dasar body */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }

        /* Styling untuk heading */
        h1 {
            text-align: center;
            font-size: 2rem;
            color: #000000;
            margin-bottom: 30px;
        }

        /* Styling tabel */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        /* Mengatur border dan padding pada tabel */
        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
        }

        /* Warna header tabel */
        th {
            background-color: #4CAF50;
            color: white;
            text-transform: uppercase;
            font-size: 0.9rem;
        }

        /* Menampilkan garis dan efek hover pada baris tabel */
        tr {
            transition: background-color 0.3s ease;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f1f1;
            cursor: pointer;
        }

        /* Mengatur responsivitas untuk tampilan mobile */
        @media screen and (max-width: 600px) {
            table, thead, tbody, th, td, tr {
                display: block;
            }

            th {
                display: none;
            }

            td {
                padding: 10px;
                text-align: right;
                position: relative;
            }

            td::before {
                content: attr(data-label);
                position: absolute;
                left: 0;
                width: 50%;
                padding-left: 15px;
                font-weight: bold;
                text-align: left;
                text-transform: uppercase;
                font-size: 0.8rem;
            }
        }
        </style>
        </head>
        <body>
        <h1>Data Posts dari JSONPlaceholder API (Node.js)</h1>
        <table>
        <thead>
        <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Body</th>
        </tr>
        </thead>
        <tbody>`;

        data.forEach(post => {
            tableHTML += `<tr>
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
            </tr>`;
        });

        tableHTML += `</tbody>
        </table>
        </body>
        </html>`;
        res.send(tableHTML);
    }   catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});