import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌍 Seeding GlobeTrotter database with sample data...\n')

  // Create a default user
  const user = await prisma.user.create({
    data: {
      email: 'traveler@globetrotter.com',
      name: 'Demo Traveler',
    },
  })
  console.log('✅ Created default user:', user.name)

  // Create a sample trip to Paris
  const parisTrip = await prisma.trip.create({
    data: {
      title: 'European Adventure',
      description: 'Exploring the beauty of Paris and Rome',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-06-10'),
      totalBudget: 3500,
      status: 'planning',
      userId: user.id,
      
      destinations: {
        create: [
          {
            city: 'Paris',
            country: 'France',
            startDate: new Date('2026-06-01'),
            endDate: new Date('2026-06-05'),
            order: 1,
            notes: 'The City of Light awaits!',
            
            activities: {
              create: [
                {
                  name: 'Visit Eiffel Tower',
                  description: 'Iconic landmark with stunning views',
                  type: 'sightseeing',
                  scheduledTime: new Date('2026-06-02T10:00:00'),
                  duration: 180,
                  cost: 25,
                  priority: 'high',
                },
                {
                  name: 'Louvre Museum Tour',
                  description: 'World-famous art museum',
                  type: 'culture',
                  scheduledTime: new Date('2026-06-03T09:00:00'),
                  duration: 240,
                  cost: 20,
                  priority: 'high',
                },
                {
                  name: 'Seine River Cruise',
                  description: 'Romantic evening cruise',
                  type: 'sightseeing',
                  scheduledTime: new Date('2026-06-04T19:00:00'),
                  duration: 120,
                  cost: 15,
                  priority: 'medium',
                },
              ],
            },
          },
          {
            city: 'Rome',
            country: 'Italy',
            startDate: new Date('2026-06-06'),
            endDate: new Date('2026-06-10'),
            order: 2,
            notes: 'Ancient history and amazing food',
            
            activities: {
              create: [
                {
                  name: 'Colosseum Tour',
                  description: 'Ancient Roman amphitheater',
                  type: 'sightseeing',
                  scheduledTime: new Date('2026-06-07T10:00:00'),
                  duration: 150,
                  cost: 18,
                  priority: 'high',
                },
                {
                  name: 'Vatican Museums',
                  description: 'Sistine Chapel and more',
                  type: 'culture',
                  scheduledTime: new Date('2026-06-08T09:00:00'),
                  duration: 240,
                  cost: 25,
                  priority: 'high',
                },
                {
                  name: 'Authentic Pasta Making Class',
                  description: 'Learn to make traditional Italian pasta',
                  type: 'food',
                  scheduledTime: new Date('2026-06-09T15:00:00'),
                  duration: 180,
                  cost: 75,
                  priority: 'medium',
                },
              ],
            },
          },
        ],
      },
      
      expenses: {
        create: [
          {
            category: 'transport',
            description: 'Flight tickets to Paris',
            amount: 850,
            date: new Date('2026-05-01'),
            currency: 'USD',
          },
          {
            category: 'accommodation',
            description: 'Hotel in Paris (5 nights)',
            amount: 600,
            date: new Date('2026-06-01'),
            currency: 'USD',
          },
          {
            category: 'accommodation',
            description: 'Hotel in Rome (4 nights)',
            amount: 480,
            date: new Date('2026-06-06'),
            currency: 'USD',
          },
          {
            category: 'transport',
            description: 'Train from Paris to Rome',
            amount: 150,
            date: new Date('2026-06-05'),
            currency: 'USD',
          },
        ],
      },
    },
  })
  console.log('✅ Created trip:', parisTrip.title)

  // Create another sample trip to Tokyo
  const tokyoTrip = await prisma.trip.create({
    data: {
      title: 'Japan Discovery',
      description: 'Exploring modern Tokyo and traditional Kyoto',
      startDate: new Date('2026-09-15'),
      endDate: new Date('2026-09-25'),
      totalBudget: 4200,
      status: 'planning',
      userId: user.id,
      
      destinations: {
        create: [
          {
            city: 'Tokyo',
            country: 'Japan',
            startDate: new Date('2026-09-15'),
            endDate: new Date('2026-09-20'),
            order: 1,
            notes: 'Vibrant city with amazing food',
            
            activities: {
              create: [
                {
                  name: 'TeamLab Borderless Museum',
                  description: 'Digital art museum',
                  type: 'culture',
                  scheduledTime: new Date('2026-09-16T14:00:00'),
                  duration: 150,
                  cost: 35,
                  priority: 'high',
                },
                {
                  name: 'Sushi Making Workshop',
                  description: 'Learn from a master chef',
                  type: 'food',
                  scheduledTime: new Date('2026-09-17T11:00:00'),
                  duration: 180,
                  cost: 90,
                  priority: 'high',
                },
              ],
            },
          },
          {
            city: 'Kyoto',
            country: 'Japan',
            startDate: new Date('2026-09-21'),
            endDate: new Date('2026-09-25'),
            order: 2,
            notes: 'Traditional temples and gardens',
            
            activities: {
              create: [
                {
                  name: 'Fushimi Inari Shrine',
                  description: 'Famous thousand torii gates',
                  type: 'sightseeing',
                  scheduledTime: new Date('2026-09-22T08:00:00'),
                  duration: 180,
                  cost: 0,
                  priority: 'high',
                },
                {
                  name: 'Tea Ceremony Experience',
                  description: 'Traditional Japanese tea ceremony',
                  type: 'culture',
                  scheduledTime: new Date('2026-09-23T15:00:00'),
                  duration: 120,
                  cost: 45,
                  priority: 'medium',
                },
              ],
            },
          },
        ],
      },
      
      expenses: {
        create: [
          {
            category: 'transport',
            description: 'Round trip flights to Tokyo',
            amount: 1200,
            date: new Date('2026-08-01'),
            currency: 'USD',
          },
          {
            category: 'accommodation',
            description: 'Hotels in Tokyo and Kyoto',
            amount: 1500,
            date: new Date('2026-09-15'),
            currency: 'USD',
          },
        ],
      },
    },
  })
  console.log('✅ Created trip:', tokyoTrip.title)

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - 1 User created`)
  console.log(`   - 2 Trips created`)
  console.log(`   - 4 Destinations created`)
  console.log(`   - 9 Activities created`)
  console.log(`   - 6 Expenses tracked`)
  console.log('\n💡 Run "npx prisma studio" to view your data in the browser')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
