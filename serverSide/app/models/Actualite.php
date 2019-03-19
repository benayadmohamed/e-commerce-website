<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Actualite extends Model
{

    protected $table = 'actualite';
    public $timestamps = true;

    public function image()
    {
        return $this->hasOne('App\models\Image');
    }
}