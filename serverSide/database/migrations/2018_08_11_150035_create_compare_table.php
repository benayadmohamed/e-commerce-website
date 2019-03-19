<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCompareTable extends Migration {

	public function up()
	{
		Schema::create('compare', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->integer('produit_id')->unsigned();
			$table->integer('profile_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('compare');
	}
}