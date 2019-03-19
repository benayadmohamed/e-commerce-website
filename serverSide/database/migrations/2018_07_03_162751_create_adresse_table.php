<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAdresseTable extends Migration
{

    public function up()
    {
        Schema::create('adresse', function (Blueprint $table) {
            $table->increments('id');
            $table->string('LName')->nullable();
            $table->string('FName')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('info')->nullable();
            $table->string('type');
            $table->integer('profile_id')->unsigned();
            $table->integer('ville_id')->unsigned()->nullable();
            $table->integer('region_id')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('adresse');
    }
}