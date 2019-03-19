<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProfileTable extends Migration
{

    public function up()
    {
        Schema::create('profile', function (Blueprint $table) {
            $table->increments('id');
            $table->string('sexe')->nullable();
            $table->date('dateN')->nullable();
            $table->string('src')->nullable();
            $table->string('type')->nullable();
            $table->integer('user_id')->unsigned();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('profile');
    }
}