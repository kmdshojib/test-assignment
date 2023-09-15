<?php
require_once("../interface/interface.php");
class GetCategories implements IGetCategories
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getCategories(): PDOStatement
    {
        $query = "SELECT P.* FROM categories p LEFT JOIN categories c ON p.id = c.id ORDER BY p.id DESC";
        $stmt = $this->db->query($query);
        $stmt->execute();
        return $stmt;
    }
    public function fetchData(): array
    {
        $result = $this->getCategories();
        $num = $result->rowCount();

        if ($num > 0) {
            $category_arr = [];
            $category_arr['data'] = [];

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $item = [
                    'id' => $id,
                    'dvd' => $dvd,
                    'book' => $book,
                    'furniture' => $furniture,
                ];
                $category_arr['data'][] = $item;
            }
            return $category_arr;
        } else {
            return ['Message' => 'Data not found'];
        }
    }
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../core/init.php');

$caegoryAPI = new GetCategories($db);
$data = $caegoryAPI->fetchData();

echo json_encode($data);