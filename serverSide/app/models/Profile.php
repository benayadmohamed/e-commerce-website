<?php

namespace App\models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{

    protected $table = 'profile';
    public $timestamps = true;

    public function adresses()
    {
        return $this->hasMany('App\models\Adresse');
    }

    public function commandes()
    {
        return $this->hasMany('App\models\Commande');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function poduitsWishlist()
    {
        return $this->belongsToMany('App\models\Produit', 'wishlist');
    }

    public function produitsCompare()
    {
        return $this->belongsToMany('App\models\Produit', 'compare');
    }

    public function ligneCommandes()
    {
        return  $this->hasMany('App\models\LigneCommande');
    }


}