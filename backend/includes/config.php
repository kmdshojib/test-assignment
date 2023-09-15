<?php
require_once('../interface/interface.php');
class DBConnection implements IDBConnection
{
    private $connection;

    public function __construct(string $dbHost, string $dbName, string $dbUser, string $dbPassword)
    {
        $this->connection = new PDO("mysql:host=" . $dbHost . ";dbname=" . $dbName . ";charset=utf8", $dbUser, $dbPassword);
        $this->connection->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getConnection(): PDO
    {
        return $this->connection;
    }
}



try {
    $database = new DBConnection("localhost", "scaditest", "root", "");
    $db = $database->getConnection();
    define("App_Name", "scanditest");
} catch (PDOException $e) {

    echo "Connection failed: " . $e->getMessage();
}