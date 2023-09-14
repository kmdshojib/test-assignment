<?php
require_once("../interface/interface.php");
class Product implements IProduct
{
    private $conn;

    private $table = 'products';

    public $id;
    public $sku;
    public $name;
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
        $query = 'SELECT p.*
        FROM ' . $this->table . ' p
        LEFT JOIN products c ON p.id = c.id 
        ORDER BY p.id DESC';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

}