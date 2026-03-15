<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ContactLeadController;
use App\Http\Controllers\Api\TravelPackageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/packages', [TravelPackageController::class, 'index']);
Route::get('/packages/{travelPackage:slug}', [TravelPackageController::class, 'show']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/contact-leads', [ContactLeadController::class, 'store']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('/user', fn (Request $request) => $request->user());
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::patch('/bookings/{booking}/status', [BookingController::class, 'updateStatus']);
    Route::post('/packages', [TravelPackageController::class, 'store']);
    Route::put('/packages/{travelPackage}', [TravelPackageController::class, 'update']);
});
