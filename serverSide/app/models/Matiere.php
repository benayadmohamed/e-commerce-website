<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Matiere extends Model 
{

    protected $table = 'matiere';
    public $timestamps = true;

    public function articles()
    {
        return $this->belongsToMany('App\models\Article', 'matiere_article');
    }

}