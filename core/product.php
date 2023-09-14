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

    public function getProducts(): mixed
    {
        $query = 'SELECT p.*
        FROM ' . $this->table . ' p
        LEFT JOIN products c ON p.id = c.id 
        ORDER BY p.id DESC';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getCategories(): mixed
    {
        $query = 'SELECT p.*
        FROM ' . $this->table . ' p
        LEFT JOIN categories c ON p.id = c.id 
        ORDER BY p.id DESC';

        $stmt = $this->conn->query($query);
        $stmt->execute();
        return $stmt;
    }

    public function postProduct(): mixed
    {
        $query = 'INSERT INTO ' . $this->table . ' SET sku=:sku, name=:name, price=:price';
        $queryParams = [
            ':sku' => $this->sku,
            ':name' => $this->name,
            ':price' => $this->price
        ];

        if (!empty($this->size)) {
            $query .= ', size=:size';
            $queryParams[':size'] = $this->size;
        }

        if (!empty($this->height)) {
            $query .= ', height=:height';
            $queryParams[':height'] = $this->height;
        }

        if (!empty($this->length)) {
            $query .= ', length=:length';
            $queryParams[':length'] = $this->length;
        }

        if (!empty($this->width)) {
            $query .= ', width=:width';
            $queryParams[':width'] = $this->width;
        }

        if (!empty($this->weight)) {
            $query .= ', weight=:weight';
            $queryParams[':weight'] = $this->weight;
        }

        $stmt = $this->conn->prepare($query);

        foreach ($queryParams as $param => &$value) {
            $stmt->bindParam($param, $value);
        }

        if ($stmt->execute()) {
            return true;
        }

        printf("Error %s \n", $stmt->error);
        return false;
    }

}