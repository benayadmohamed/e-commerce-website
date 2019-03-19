<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaiementTable extends Migration
{

    public function up()
    {
        Schema::create('paiement', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('type', array('cash', 'paypal'));
            $table->integer('profile_id')->unsigned();
            $table->string('payer_id')->nullable();
            $table->integer('commande_id')->unsigned();
            $table->timestamps();
            $table->string('autre')->nullable();
        });
    }

    public function down()
    {
        Schema::drop('paiement');
    }
}