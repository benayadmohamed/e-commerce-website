<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{

    protected $table = 'color';
    public $timestamps = true;

    public function article()
    {
        return $this->belongsToMany('App\models\Article', 'color_article');
    }

}