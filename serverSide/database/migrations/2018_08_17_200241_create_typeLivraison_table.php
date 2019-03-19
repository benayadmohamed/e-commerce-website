<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTypeLivraisonTable extends Migration
{

    public function up()
    {
        Schema::create('typeLivraison', function (Blueprint $table) {
            $table->increments('id');
            $table->text('info')->nullable();
            $table->string('name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('typeLivraison');
    }
}