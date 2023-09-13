<?php
require_once("./interface/interface.php");
class DBConnection implements IDBConnection
{
    private $connection;

    public function __construct(string $dbHost, string $dbName, string $dbUser, string $dbPassword)
    {
        $this->connection = new PDO("mysql:host=" . $dbHost . ";dbname=" . $dbName . ";charset=utf8", $dbUser, $dbPassword);
    }

    public function getConnection(): PDO
    {
        return $this->connection;
    }
}

try {
    $database = new DBConnection("localhost", "4315261_testtask", "root", "");
    $db = $database->getConnection();
    define("App_Name", "scanditest");

    echo "Connected to the database!";
} catch (PDOException $e) {

    echo "Connection failed: " . $e->getMessage();
}