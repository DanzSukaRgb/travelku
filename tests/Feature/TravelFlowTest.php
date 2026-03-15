<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\TravelPackage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TravelFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_home_page_renders_successfully(): void
    {
        $this->get('/')->assertOk()->assertSee('Travelku');
    }

    public function test_public_user_can_create_booking(): void
    {
        $package = TravelPackage::firstOrFail();

        $this->postJson('/api/bookings', [
            'travel_package_id' => $package->id,
            'customer_name' => 'QA Traveler',
            'customer_email' => 'qa@example.com',
            'customer_phone' => '0812345678',
            'travel_date' => now()->addDays(10)->toDateString(),
            'travelers' => 2,
            'special_request' => 'Window seat if possible',
        ])->assertCreated()->assertJsonPath('data.travel_package_id', $package->id);

        $this->assertDatabaseCount('bookings', 3);
    }

    public function test_admin_can_update_booking_status(): void
    {
        $admin = User::where('email', 'admin@travelku.test')->firstOrFail();
        $booking = Booking::firstOrFail();

        $this->actingAs($admin)
            ->patchJson("/api/bookings/{$booking->id}/status", ['status' => 'confirmed'])
            ->assertOk()
            ->assertJsonPath('data.status', 'confirmed');
    }
}
