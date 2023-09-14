<?php
declare(strict_types=1);
require_once("../interface/interface.php");
class GetProduct implements IGetProducts
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getProducts(): PDOStatement
    {
        $query = 'SELECT 
            p.*
        FROM 
            products p
            LEFT JOIN
            products c ON p.id = c.id 
        ORDER BY p.id DESC';

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function fetchData(): array
    {
        $result = $this->getProducts();
        $num = $result->rowCount();

        if ($num > 0) {
            $product_arr = [];
            $product_arr['data'] = [];

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $item = [
                    'id' => $id,
                    'sku' => $sku,
                    'name' => $name,
                    'price' => $price,
                    'width' => $width,
                    'height' => $height,
                    'length' => $length,
                    'weight' => $weight,
                    'size' => $size,
                ];
                $product_arr['data'][] = $item;
            }
            return $product_arr;
        } else {
            return ['Message' => 'Data not found'];
        }
    }
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once("../core/init.php");
if (isset($db) && $db instanceof PDO) {

    $productAPI = new GetProduct($db);
    $data = $productAPI->fetchData();

    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Database connection error']);
}