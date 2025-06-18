const mysql = require('mysql2/promise');

/**
 * MySQL database connection pool configuration.
 * - Uses environment variables for configuration.
 * * Environment Variables:
 *   - DB_HOST: Database host (default: 'localhost')    
 *   - DB_USER: Database user (required)
 *   - DB_PASSWORD: Database password (required)
 *   - DB_NAME: Database name (required)
 *   - DB_PORT: Database port (default: 3306)
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

module.exports = pool;