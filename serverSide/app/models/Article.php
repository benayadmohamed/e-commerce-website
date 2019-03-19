<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{

    protected $table = 'article';
    public $timestamps = true;

    public static function init(Array $input)
    {
        $article = new Article();
        if (isset($input['taille']))
            $article->taille = $input['taille'];
        if (isset($input['stock']))
            $article->stock = $input['stock'];
        return $article;
    }

    public function init2(Array $input)
    {
        if (isset($input['taille']))
            $this->taille = $input['taille'];
        if (isset($input['stock']))
            $this->stock = $input['stock'];

    }

    public function images()
    {
        return $this->hasMany('App\models\Image');
    }

    public function produit()
    {
        return $this->belongsTo('App\models\Produit', 'produit_id');
    }

    public function colors()
    {
        return $this->belongsToMany('App\models\Color', 'color_article');
    }

    public function matieres()
    {
        return $this->belongsToMany('App\models\Matiere', 'matiere_article');
    }
}