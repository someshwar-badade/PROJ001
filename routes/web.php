<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\CompanyJobController;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
    Route::get('/companies/create', [CompanyController::class, 'create'])->name('companies.create');
    Route::post('/companies', [CompanyController::class, 'store'])->name('companies.store');
    Route::get('/companies/{company}', [CompanyController::class, 'show'])->name('companies.show');
    Route::get('/companies/{company}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
    Route::put('/companies/{company}', [CompanyController::class, 'update'])->name('companies.update');
    Route::delete('/companies/{company}', [CompanyController::class, 'destroy'])->name('companies.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::get('/roles/{role}', [RoleController::class, 'show'])->name('roles.show');
    Route::get('/roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');
    Route::get('/permissions/create', [PermissionController::class, 'create'])->name('permissions.create');
    Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::get('/permissions/{permission}', [PermissionController::class, 'show'])->name('permissions.show');
    Route::get('/permissions/{permission}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
});



Route::middleware(['auth'])->group(function () {
    Route::get('/company-jobs', [CompanyJobController::class, 'index'])->name('company_jobs.index');
    Route::get('/company-jobs/create', [CompanyJobController::class, 'create'])->name('company_jobs.create');
    Route::post('/company-jobs', [CompanyJobController::class, 'store'])->name('company_jobs.store');
    Route::get('/company-jobs/{companyJob}', [CompanyJobController::class, 'show'])->name('company_jobs.show');
    Route::get('/company-jobs/{companyJob}/edit', [CompanyJobController::class, 'edit'])->name('company_jobs.edit');
    Route::put('/company-jobs/{companyJob}', [CompanyJobController::class, 'update'])->name('company_jobs.update');
    Route::delete('/company-jobs/{companyJob}', [CompanyJobController::class, 'destroy'])->name('company_jobs.destroy');
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
