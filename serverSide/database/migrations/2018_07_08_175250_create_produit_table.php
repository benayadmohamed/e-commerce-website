<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProduitTable extends Migration
{

    public function up()
    {
        Schema::create('produit', function (Blueprint $table) {
            $table->increments('id');
            $table->float('prix');
            $table->float('tva')->nullable();
            $table->string('name');
            $table->text('descriptif')->nullable();
            $table->integer('categorie_id')->unsigned();
            $table->integer('sousCategorie_id')->unsigned()->nullable();
            $table->integer('marque_id')->unsigned()->nullable();
            $table->integer('reduction_id')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('produit');
    }
}