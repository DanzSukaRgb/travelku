<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\TravelPackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        abort_unless($request->user(), 401);

        $query = Booking::query()->with('travelPackage.destination')->latest();

        if (! $request->user()->is_admin) {
            $query->where('user_id', $request->user()->id);
        }

        return response()->json(['data' => $query->get()]);
    }

    public function store(StoreBookingRequest $request): JsonResponse
    {
        $package = TravelPackage::query()->findOrFail($request->integer('travel_package_id'));
        $unitPrice = (float) ($package->discount_price ?: $package->price);

        $booking = Booking::create([
            ...$request->validated(),
            'user_id' => $request->user()?->id,
            'booking_code' => 'TRV-'.Str::upper(Str::random(8)),
            'total_amount' => $unitPrice * $request->integer('travelers'),
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Booking received. Our travel specialist will confirm shortly.',
            'data' => $booking->load('travelPackage.destination'),
        ], 201);
    }

    public function updateStatus(Request $request, Booking $booking): JsonResponse
    {
        abort_unless($request->user()?->is_admin, 403);

        $data = $request->validate([
            'status' => ['required', 'in:pending,confirmed,completed,cancelled'],
        ]);

        $booking->update($data);

        return response()->json(['message' => 'Booking status updated.', 'data' => $booking->fresh('travelPackage')]);
    }
}
