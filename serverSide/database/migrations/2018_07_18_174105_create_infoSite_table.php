<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInfoSiteTable extends Migration {

	public function up()
	{
		Schema::create('infoSite', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('tele', 255);
			$table->string('name', 255);
			$table->string('fax', 255);
			$table->string('adresse', 500);
			$table->string('x');
			$table->string('y');
			$table->string('debutDeService');
			$table->string('finDeService');
			$table->string('email');
		});
	}

	public function down()
	{
		Schema::drop('infoSite');
	}
}