<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('user_companies', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // User Foreign Key
            $table->foreignId('company_id')->constrained()->onDelete('cascade'); // Company Foreign Key
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_companies');
    }
};

