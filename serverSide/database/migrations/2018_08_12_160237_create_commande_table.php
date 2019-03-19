<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommandeTable extends Migration
{

    public function up()
    {
        Schema::create('commande', function (Blueprint $table) {
            $table->increments('id');
            $table->datetime('dateC');
            $table->double('total')->nullable();
            $table->enum('statut', array('new', 'hold', 'shipped', 'delivered', 'closed'));
            $table->integer('profile_id')->unsigned();
            $table->date('shipped')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('commande');
    }
}