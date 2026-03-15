<?php

namespace App\Support;

use App\Models\Booking;
use App\Models\ContactLead;
use App\Models\Destination;
use App\Models\TravelPackage;

class HomePageData
{
    public static function make(): array
    {
        $featuredPackages = TravelPackage::query()
            ->with('destination')
            ->where('is_active', true)
            ->where('is_featured', true)
            ->latest()
            ->take(3)
            ->get();

        $destinations = Destination::query()
            ->where('is_featured', true)
            ->orderByDesc('rating')
            ->take(4)
            ->get();

        return [
            'hero' => [
                'eyebrow' => 'Curated journeys across Asia & beyond',
                'title' => 'Plan better trips with a booking flow that feels premium, not chaotic.',
                'subtitle' => 'Travelku combines polished exploration, transparent packages, and a simple booking process for modern travelers.',
                'stats' => [
                    ['label' => 'Happy travelers', 'value' => '4.8k+'],
                    ['label' => 'Curated packages', 'value' => TravelPackage::query()->where('is_active', true)->count()],
                    ['label' => 'Lead response', 'value' => '< 15 min'],
                ],
            ],
            'featuredPackages' => $featuredPackages,
            'destinations' => $destinations,
            'testimonials' => [
                [
                    'name' => 'Nadia Putri',
                    'role' => 'Remote Product Designer',
                    'quote' => 'Travelku feels like booking through a premium concierge—clean itinerary, fast response, and no hidden friction.',
                ],
                [
                    'name' => 'Rizky Akbar',
                    'role' => 'Startup Founder',
                    'quote' => 'The package detail and booking flow are genuinely clear. I could compare options and secure dates in minutes.',
                ],
                [
                    'name' => 'Michelle Tan',
                    'role' => 'Frequent Explorer',
                    'quote' => 'Loved the curated routes and the post-booking follow-up. It feels less like a template website and more like a real brand.',
                ],
            ],
            'metrics' => [
                'totalBookings' => Booking::query()->count(),
                'totalLeads' => ContactLead::query()->count(),
            ],
        ];
    }
}
