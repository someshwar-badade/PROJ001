<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('users', [UserController::class, 'users'])->name('users');
    Route::post('add-user', [UserController::class, 'addUser'])->name('addUser');
    Route::get('get-edit-user-details/{id}', [UserController::class, 'editUser'])->name('editUser');
    Route::put('update-user', [UserController::class, 'updateUser'])->name('updateUser');
    Route::delete('delete-user/${id}', [UserController::class, 'deleteUser'])->name('deleteUser');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
