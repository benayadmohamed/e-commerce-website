<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

    protected $table = 'image';
    public $timestamps = true;

    public function article()
    {
        return $this->belongsTo('App\models\Article', 'article_id');
    }

    public function actualite()
    {
        return $this->belongsTo('App\models\Actualite', 'actualite_id');
    }
}