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

    }

    public static function getIncPath()
    {

    }

    public static function getCorePath()
    {

    }
}