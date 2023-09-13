<?php

require_once "./interface/interface.php";

class Config implements ConfigInterface
{
    public static function getDs()
    {
        return DIRECTORY_SEPARATOR;
    }

    public static function getSiteRoot()
    {
        return self::getDs() . "xampp" . self::getDs() . "htdocs" . self::getDs() . "scadi-test";
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

require_once $incPath . "/config.php";