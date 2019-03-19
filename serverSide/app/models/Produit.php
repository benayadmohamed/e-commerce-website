<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{

    protected $table = 'produit';
    public $timestamps = true;


    public static function init(Array $input)
    {
        $produit = new Produit();

        if (isset($input['prix']))
            $produit->prix = $input['prix'];
        if (isset($input['tva']))
            $produit->tva = $input['tva'];
        if (isset($input['name']))
            $produit->name = $input['name'];
        if (isset($input['descriptif']))
            $produit->descriptif = $input['descriptif'];
        if (isset($input['marque_id']))
            $produit->marque_id = $input['marque_id'];
        if (isset($input['reduction_id']))
            $produit->reduction_id = $input['reduction_id'];
        if (isset($input['categorie_id']))
            $produit->categorie_id = $input['categorie_id'];
        if (isset($input['sousCategorie_id']))
            $produit->sousCategorie_id = $input['sousCategorie_id'];
        return $produit;
    }

    public function init2(Array $input)
    {
        /* foreach ($input as $key => $value) {
             $this->{$key} = $value;
         }*/
        if (isset($input['prix']))
            $this->prix = $input['prix'];
        if (isset($input['tva']))
            $this->tva = $input['tva'];
        if (isset($input['name']))
            $this->name = $input['name'];
        if (isset($input['descriptif']))
            $this->descriptif = $input['descriptif'];
        if (isset($input['marque_id']))
            $this->marque_id = $input['marque_id'];
        if (isset($input['reduction_id']))
            $this->reduction_id = $input['reduction_id'];
        if (isset($input['categorie_id']))
            $this->categorie_id = $input['categorie_id'];
        if (isset($input['sousCategorie_id']))
            $this->sousCategorie_id = $input['sousCategorie_id'];
    }

    public function categorie()
    {
        return $this->belongsTo('App\models\Categorie', 'categorie_id');
    }

    public function sousCategorie()
    {
        return $this->belongsTo('App\models\SousCategorie', 'sousCategorie_id');
    }

    public function commandes()
    {
        return $this->belongsToMany('App\models\Commande', 'LigneCommande');
    }

    public function article()
    {
        return $this->hasOne('App\models\Article');
    }

    public function marque()
    {
        return $this->belongsTo('App\models\Marque', 'marque_id');
    }

    public function reduction()
    {
        return $this->belongsTo('App\models\Reduction', 'reduction_id');
    }

    public function profileAvis()
    {
        return $this->belongsToMany('App\models\Profile', 'avis');
    }

}