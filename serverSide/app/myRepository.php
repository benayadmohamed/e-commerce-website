<?php
/**
 * Created by PhpStorm.
 * User: simo-
 * Date: 30/06/2018
 * Time: 12:17
 */

namespace App;


interface myRepository
{
    public function get();

    public function update();

    public function save();

    public function delete();

}