<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWishlistTable extends Migration {

	public function up()
	{
		Schema::create('wishlist', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('produit_id')->unsigned();
			$table->integer('profile_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('wishlist');
	}
}