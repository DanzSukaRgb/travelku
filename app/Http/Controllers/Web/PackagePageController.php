<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\TravelPackage;
use Inertia\Inertia;
use Inertia\Response;

class PackagePageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Packages/Index', [
            'packages' => TravelPackage::query()
                ->with('destination')
                ->where('is_active', true)
                ->orderByDesc('is_featured')
                ->latest()
                ->get(),
            'destinations' => Destination::query()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function show(TravelPackage $travelPackage): Response
    {
        abort_unless($travelPackage->is_active, 404);

        return Inertia::render('Packages/Show', [
            'package' => $travelPackage->load('destination'),
            'relatedPackages' => TravelPackage::query()
                ->with('destination')
                ->where('destination_id', $travelPackage->destination_id)
                ->where('id', '!=', $travelPackage->id)
                ->where('is_active', true)
                ->take(3)
                ->get(),
        ]);
    }
}
