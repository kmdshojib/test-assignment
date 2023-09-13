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