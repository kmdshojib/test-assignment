<?php
require_once("./interface/interface.php");
class Product implements IProduct
{
    private $conn;
    private $table = 'products';
    public $id;
    public $name;
    public $sku;

    public $price;

    public $size;
    public $height;
    public $width;
    public $length;
    public $weight;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getProducts()
    {
        $query = "SELECT * 
        FROM "
            . $this->table .
            " p
        LEFT JOIN
        categories c ON p.id = c.id 
        ORDER BY p.id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

}