<?php
require_once("../interface/interface.php");

class DeleteProduct implements IDeleteProducts
{
    private $db;
    private $product;

    public function __construct($db)
    {
        $this->db = $db;
        $this->product = new Product($db);
    }
    public function deleteProducts(mixed $data): array
    {
        if (isset($data->ids) && is_array($data->ids)) {
            $ids = $data->ids;

            if ($this->product->deleteProducts($ids)) {
                return array('message' => 'The products have been deleted successfully');
            } else {
                return array('message' => 'Something went wrong');
            }
        } else {
            return array('message' => 'Invalid request. Please provide an array of valid product IDs.');
        }
    }

}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, X-Requested-With');

include_once('../core/init.php');

$deleteRequest = new DeleteProduct($db);
$data = json_decode(file_get_contents('php://input'));

$response = $deleteRequest->deleteProducts($data);

echo json_encode($response);