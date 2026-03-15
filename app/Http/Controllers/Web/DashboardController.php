<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\ContactLead;
use App\Models\Destination;
use App\Models\TravelPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $bookingQuery = Booking::query()->with('travelPackage.destination')->latest();

        if (! $user->is_admin) {
            $bookingQuery->where('user_id', $user->id);
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'packages' => TravelPackage::query()->count(),
                'bookings' => Booking::query()->count(),
                'leads' => ContactLead::query()->count(),
                'destinations' => Destination::query()->count(),
            ],
            'packages' => TravelPackage::query()->with('destination')->latest()->take(6)->get(),
            'bookings' => $bookingQuery->take(8)->get(),
            'isAdmin' => (bool) $user->is_admin,
        ]);
    }
}
