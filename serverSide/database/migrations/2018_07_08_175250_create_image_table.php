<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateImageTable extends Migration
{

    public function up()
    {
        Schema::create('image', function (Blueprint $table) {
            $table->increments('id');
            $table->string('src')->nullable();;
            $table->string('name')->nullable();;
            $table->integer('article_id')->unsigned()->nullable();;
            $table->integer('actualite_id')->unsigned()->nullable();;
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('image');
    }
}