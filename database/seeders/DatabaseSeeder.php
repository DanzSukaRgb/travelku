<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\ContactLead;
use App\Models\Destination;
use App\Models\TravelPackage;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@travelku.test'],
            ['name' => 'Travelku Admin', 'password' => 'password', 'is_admin' => true, 'email_verified_at' => now()],
        );

        $traveler = User::updateOrCreate(
            ['email' => 'traveler@travelku.test'],
            ['name' => 'Travelku Traveler', 'password' => 'password', 'is_admin' => false, 'email_verified_at' => now()],
        );

        $destinations = collect([
            [
                'name' => 'Bali',
                'slug' => 'bali',
                'country' => 'Indonesia',
                'tagline' => 'Oceanfront villas, sacred temples, and curated island-hopping in one flow.',
                'description' => 'A modern Bali itinerary that balances iconic hotspots with calmer hidden corners.',
                'hero_image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
                'base_price' => 4250000,
                'rating' => 4.9,
                'is_featured' => true,
            ],
            [
                'name' => 'Labuan Bajo',
                'slug' => 'labuan-bajo',
                'country' => 'Indonesia',
                'tagline' => 'Liveaboard energy, pink beaches, and cinematic sunsets across Komodo waters.',
                'description' => 'Built for travelers who want marine adventure with premium logistics.',
                'hero_image' => 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80',
                'base_price' => 5890000,
                'rating' => 4.8,
                'is_featured' => true,
            ],
            [
                'name' => 'Kyoto',
                'slug' => 'kyoto',
                'country' => 'Japan',
                'tagline' => 'Slow mornings, design hotels, and a cleaner way to explore timeless Japan.',
                'description' => 'Culture-first route for design lovers, food lovers, and calm wanderers.',
                'hero_image' => 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
                'base_price' => 12750000,
                'rating' => 4.9,
                'is_featured' => true,
            ],
            [
                'name' => 'Seoul',
                'slug' => 'seoul',
                'country' => 'South Korea',
                'tagline' => 'Style, café culture, and nightlife wrapped in a practical city itinerary.',
                'description' => 'For travelers who want pop culture, shopping, and smooth city pacing.',
                'hero_image' => 'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=1200&q=80',
                'base_price' => 9850000,
                'rating' => 4.7,
                'is_featured' => true,
            ],
        ])->map(fn ($destination) => Destination::updateOrCreate(['slug' => $destination['slug']], $destination))->keyBy('slug');

        $packages = [
            [
                'destination_id' => $destinations['bali']->id,
                'title' => 'Bali Coastal Reset',
                'slug' => 'bali-coastal-reset',
                'summary' => '4D3N ocean-view escape with Nusa Penida day trip, beach club slots, and sunset dining.',
                'description' => 'Perfect for couples or small groups who want Bali with less chaos: premium stays, smoother transfers, and a highly photogenic route.',
                'duration_days' => 4,
                'group_size' => 8,
                'price' => 4850000,
                'discount_price' => 4450000,
                'thumbnail' => 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
                    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
                    'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80',
                    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=900&q=80',
                ],
                'highlights' => ['Oceanfront villa check-in', 'Nusa Penida fast boat trip', 'Private sunset dinner setup'],
                'inclusions' => ['Hotel & breakfast', 'Airport transfer', 'Fast boat tickets', 'Dedicated host'],
                'itinerary' => [
                    ['title' => 'Arrival & slow luxury start', 'description' => 'Airport pickup, villa check-in, welcome dinner, and evening spa slot.'],
                    ['title' => 'Nusa Penida icon tour', 'description' => 'Kelingking, Angel Billabong, broken beach, and curated lunch stop.'],
                    ['title' => 'Free pace & sunset', 'description' => 'Flexible day for beach club or café hopping, closed with sunset dinner.'],
                    ['title' => 'Departure', 'description' => 'Relaxed breakfast and timely airport transfer.'],
                ],
                'featured_badge' => 'Best seller',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'destination_id' => $destinations['labuan-bajo']->id,
                'title' => 'Komodo Sailing Escape',
                'slug' => 'komodo-sailing-escape',
                'summary' => '3D2N premium phinisi route with Padar hike, manta spotting, and pink beach time.',
                'description' => 'A compact but cinematic Flores route for adventurous travelers who still care about comfort and pacing.',
                'duration_days' => 3,
                'group_size' => 10,
                'price' => 6990000,
                'discount_price' => 6450000,
                'thumbnail' => 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
                    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
                    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80',
                ],
                'highlights' => ['Private cabin liveaboard', 'Sunrise at Padar', 'Snorkeling at Manta Point'],
                'inclusions' => ['Boat cabin', 'Meals onboard', 'Guide & crew', 'Island entry logistics'],
                'itinerary' => [
                    ['title' => 'Boarding day', 'description' => 'Port transfer, phinisi welcome, and first island hop by golden hour.'],
                    ['title' => 'Komodo icons', 'description' => 'Padar sunrise, Pink Beach, Komodo ranger visit, manta snorkeling.'],
                    ['title' => 'Back to mainland', 'description' => 'Slow breakfast at sea and return transfer to airport/hotel.'],
                ],
                'featured_badge' => 'Adventure pick',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'destination_id' => $destinations['kyoto']->id,
                'title' => 'Kyoto Design & Culture Week',
                'slug' => 'kyoto-design-culture-week',
                'summary' => '6D5N culture-rich route with ryokan stay, design cafés, and seamless intercity pacing.',
                'description' => 'For travelers who want classic Japan with a polished, current aesthetic and practical booking structure.',
                'duration_days' => 6,
                'group_size' => 6,
                'price' => 13900000,
                'discount_price' => 12950000,
                'thumbnail' => 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1526481280695-3c4691b4c7d7?auto=format&fit=crop&w=900&q=80',
                    'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=900&q=80',
                ],
                'highlights' => ['Ryokan night', 'Arashiyama morning slot', 'Tea ceremony & chef-selected dinner'],
                'inclusions' => ['Hotel + ryokan', 'Airport rail support', 'Cultural experience tickets'],
                'itinerary' => [
                    ['title' => 'Kyoto arrival', 'description' => 'Hotel check-in, neighborhood walk, and dinner curation.'],
                    ['title' => 'Temple circuit', 'description' => 'Golden Pavilion, Philosopher’s Path, and café stop.'],
                    ['title' => 'Arashiyama flow', 'description' => 'Bamboo grove early access and riverside lunch.'],
                    ['title' => 'Craft & tea', 'description' => 'Ceremony and artisan district exploration.'],
                    ['title' => 'Flexible city day', 'description' => 'Shopping, hidden spots, or day trip support.'],
                    ['title' => 'Departure', 'description' => 'Smooth checkout and airport rail guidance.'],
                ],
                'featured_badge' => 'Culture edit',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'destination_id' => $destinations['seoul']->id,
                'title' => 'Seoul City Rhythm',
                'slug' => 'seoul-city-rhythm',
                'summary' => '5D4N shopping, café, and nightlife route with practical district planning.',
                'description' => 'A clean city trip structure for first-timers who want more than a generic itinerary.',
                'duration_days' => 5,
                'group_size' => 8,
                'price' => 10800000,
                'discount_price' => 9950000,
                'thumbnail' => 'https://images.unsplash.com/photo-1538485399081-7c8f0c3f4ad2?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=900&q=80',
                    'https://images.unsplash.com/photo-1470218091926-22a08a325802?auto=format&fit=crop&w=900&q=80',
                ],
                'highlights' => ['Gangnam & Seongsu pacing', 'Night market route', 'Photo-friendly city guide'],
                'inclusions' => ['Hotel stay', 'Airport transfer', 'City pass starter kit'],
                'itinerary' => [
                    ['title' => 'Arrival and settle in', 'description' => 'Airport pickup and first-night district recommendations.'],
                    ['title' => 'Heritage to modern Seoul', 'description' => 'Palace route, Bukchon, and Seongsu.'],
                    ['title' => 'Retail and coffee circuit', 'description' => 'Hongdae, Myeongdong, and cafe culture highlights.'],
                    ['title' => 'Flexible deep-dive', 'description' => 'Beauty, food crawl, or custom activity block.'],
                    ['title' => 'Departure', 'description' => 'Checkout and transfer support.'],
                ],
                'featured_badge' => 'City favorite',
                'is_featured' => false,
                'is_active' => true,
            ],
        ];

        foreach ($packages as $package) {
            TravelPackage::updateOrCreate(['slug' => $package['slug']], $package);
        }

        $seededPackages = TravelPackage::all();

        foreach ([
            ['name' => 'Amel Sari', 'email' => 'amel@example.com', 'phone' => '081234567890', 'interest' => 'Honeymoon', 'message' => 'Need a honeymoon package for Bali in July.', 'source' => 'landing-page'],
            ['name' => 'Rama Wijaya', 'email' => 'rama@example.com', 'phone' => '082233445566', 'interest' => 'Corporate retreat', 'message' => 'Looking for team trip options for 12 people.', 'source' => 'dashboard'],
        ] as $lead) {
            ContactLead::updateOrCreate(['email' => $lead['email'], 'interest' => $lead['interest']], $lead + ['status' => 'new']);
        }

        $bookingDates = [Carbon::now()->addWeeks(2), Carbon::now()->addWeeks(5)];
        foreach ($seededPackages->take(2) as $index => $package) {
            Booking::updateOrCreate(
                ['booking_code' => 'TRV-SEED-'.($index + 1)],
                [
                    'user_id' => $index === 0 ? $traveler->id : $admin->id,
                    'travel_package_id' => $package->id,
                    'customer_name' => $index === 0 ? 'Travelku Traveler' : 'Travelku Admin',
                    'customer_email' => $index === 0 ? $traveler->email : $admin->email,
                    'customer_phone' => '0812'.random_int(10000000, 99999999),
                    'travel_date' => $bookingDates[$index],
                    'travelers' => $index + 2,
                    'special_request' => 'Need airport pickup and vegetarian meals.',
                    'total_amount' => (float) ($package->discount_price ?: $package->price) * ($index + 2),
                    'status' => $index === 0 ? 'pending' : 'confirmed',
                ],
            );
        }
    }
}
