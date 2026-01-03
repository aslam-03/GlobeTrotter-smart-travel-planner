// Test script for GlobeTrotter API routes
// Run with: node test-api.js (while dev server is running)

const BASE_URL = 'http://localhost:3000'

async function testGetAllTrips() {
  console.log('\n🧪 Testing GET /api/trips...')
  try {
    const response = await fetch(`${BASE_URL}/api/trips`)
    const data = await response.json()
    console.log('✅ Status:', response.status)
    console.log('📊 Response:', JSON.stringify(data, null, 2))
    return data
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

async function testCreateTrip() {
  console.log('\n🧪 Testing POST /api/trips...')
  const newTrip = {
    title: 'Caribbean Cruise',
    description: 'Island hopping in the Caribbean',
    startDate: '2026-11-01',
    endDate: '2026-11-15',
    totalBudget: 4500,
    status: 'planning'
  }
  
  try {
    const response = await fetch(`${BASE_URL}/api/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrip)
    })
    const data = await response.json()
    console.log('✅ Status:', response.status)
    console.log('📊 Response:', JSON.stringify(data, null, 2))
    return data
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

async function testGetTripById(id) {
  console.log(`\n🧪 Testing GET /api/trips/${id}...`)
  try {
    const response = await fetch(`${BASE_URL}/api/trips/${id}`)
    const data = await response.json()
    console.log('✅ Status:', response.status)
    console.log('📊 Response:', JSON.stringify(data, null, 2))
    return data
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

async function runTests() {
  console.log('🚀 Starting GlobeTrotter API Tests...')
  console.log('='.repeat(50))
  
  // Test 1: Get all trips
  await testGetAllTrips()
  
  // Test 2: Create a new trip
  const created = await testCreateTrip()
  
  // Test 3: Get trip by ID (using existing trip)
  await testGetTripById(1)
  
  // Test 4: Get the newly created trip if successful
  if (created?.trip?.id) {
    await testGetTripById(created.trip.id)
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ All tests completed!')
}

runTests()
