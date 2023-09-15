<?php

require_once ("../interface/interface.php");

class Config implements ConfigInterface
{
    public static function getDs()
    {
        return DIRECTORY_SEPARATOR;
    }

    public static function getSiteRoot()
    {
        return self::getDS() . 'wamp64' . self::getDS() . 'www' . self::getDS() . "scadi_test";
    }

    public static function getIncPath()
    {
        return self::getSiteRoot() . self::getDs() . "includes";
    }

    public static function getCorePath()
    {
        return self::getSiteRoot() . self::getDs() . "core";
    }
}

$ds = Config::getDs();
$siteRoot = Config::getSiteRoot();
$incPath = Config::getIncPath();
$corePath = Config::getCorePath();

require_once $incPath . '/config.php';
require_once $corePath . '/product.php';