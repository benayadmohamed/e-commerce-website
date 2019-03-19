<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateColorTable extends Migration {

	public function up()
	{
		Schema::create('color', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('color');
	}
}