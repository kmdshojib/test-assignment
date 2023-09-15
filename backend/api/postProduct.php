<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, X-Requested-With');

include_once('.././core/init.php');

$product = new Product($db);

$data = json_decode(file_get_contents('php://input'));

$product->sku = $data->sku;
$product->name = $data->name;
$product->price = $data->price;
$product->size = isset($data->size) ? $data->size : null;
$product->height = isset($data->height) ? $data->height : null;
$product->length = isset($data->length) ? $data->length : null;
$product->width = isset($data->width) ? $data->width : null;
$product->weight = isset($data->weight) ? $data->weight : null;

if ($product->postProduct()) {
    $response = array('message' => 'Your product has been created successfully');
    http_response_code(200);
    echo json_encode($response);

} else {
    echo json_encode(
        array('message' => 'Something went wrong')
    );
}