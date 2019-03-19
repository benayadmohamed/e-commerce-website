<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateActualiteTable extends Migration
{

    public function up()
    {
        Schema::create('actualite', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titre');
            $table->string('sousTitre')->nullable();
            $table->boolean('active')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('actualite');
    }
}