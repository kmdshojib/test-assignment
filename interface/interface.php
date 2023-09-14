<?php

interface IDBConnection
{
    public function getConnection(): PDO;
}

interface ConfigInterface
{
    public static function getDS();

    public static function getSiteRoot();

    public static function getIncPath();

    public static function getCorePath();
}

interface IProduct
{
    public function getProducts(): mixed;
    public function getCategories(): mixed;
    public function postProduct(): mixed;
}

interface IGetProducts
{
    public function getProducts(): PDOStatement;
    public function fetchData(): array;
}

interface IGetCategories
{
    public function getCategories(): PDOStatement;
    public function fetchData(): array;
}