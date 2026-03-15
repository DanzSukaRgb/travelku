<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTravelPackageRequest;
use App\Models\TravelPackage;
use Illuminate\Http\JsonResponse;

class TravelPackageController extends Controller
{
    public function index(): JsonResponse
    {
        $packages = TravelPackage::query()
            ->with('destination')
            ->where('is_active', true)
            ->orderByDesc('is_featured')
            ->latest()
            ->get();

        return response()->json(['data' => $packages]);
    }

    public function show(TravelPackage $travelPackage): JsonResponse
    {
        $travelPackage->load('destination');

        abort_unless($travelPackage->is_active, 404);

        return response()->json(['data' => $travelPackage]);
    }

    public function store(StoreTravelPackageRequest $request): JsonResponse
    {
        $travelPackage = TravelPackage::create($request->validated());

        return response()->json(['message' => 'Package created.', 'data' => $travelPackage->load('destination')], 201);
    }

    public function update(StoreTravelPackageRequest $request, TravelPackage $travelPackage): JsonResponse
    {
        $travelPackage->update($request->validated());

        return response()->json(['message' => 'Package updated.', 'data' => $travelPackage->fresh('destination')]);
    }
}
