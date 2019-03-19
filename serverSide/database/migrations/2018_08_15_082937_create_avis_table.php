<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAvisTable extends Migration
{

    public function up()
    {
        Schema::create('avis', function (Blueprint $table) {
            $table->increments('id');
            $table->text('avis')->nullable();
            $table->boolean('recommande')->nullable();
            $table->integer('etoiles')->nullable();
            $table->string('avisTitre')->nullable();
            $table->integer('profile_id')->unsigned();
            $table->integer('produit_id')->unsigned();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('avis');
    }
}