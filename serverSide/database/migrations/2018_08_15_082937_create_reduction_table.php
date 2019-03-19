<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReductionTable extends Migration {

	public function up()
	{
		Schema::create('reduction', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->float('valeurPourcentage');
		});
	}

	public function down()
	{
		Schema::drop('reduction');
	}
}