const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Listing = require('./models/Listing');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/basudevbnb'
    );
    console.log('MongoDB connected for seeding');
  } catch (err) {
    console.error('DB Connection Error:', err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // साफ database
    await User.deleteMany();
    await Listing.deleteMany();

    console.log('Old data cleared');

    // ✅ Create Users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@basudevbnb.com',
      password: 'admin123',
      role: 'admin',
      bio: 'Platform administrator'
    });

    console.log('Admin1 created:', admin.email);

    const admin2 = await User.create({
      name: 'Naidu Basudev',
      email: 'basudevnaidu2@gmail.com',
      password: 'basudev@2006',
      role: 'admin',
      bio: 'Co-founder of BasudevBnB'
    });

    console.log('Admin2 created:', admin2.email);

    const host = await User.create({
      name: 'John Host',
      email: 'host@basudevbnb.com',
      password: 'host123',
      role: 'user',
      bio: 'Passionate host with beautiful properties'
    });

    console.log('Host created:', host.email);

    const user = await User.create({
      name: 'Jane User',
      email: 'user@basudevbnb.com',
      password: 'user123',
      role: 'user',
      bio: 'Travel enthusiast'
    });

    console.log('User created:', user.email);

    // ✅ Listings
    const listings = [
      {
        title: 'Beachfront Paradise Villa',
        description: 'Stunning beachfront villa...',
        price: 350,
        location: 'Malibu, California',
        category: 'Beach',
        amenities: ['WiFi', 'Pool'],
        images: [
          'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800'
        ],
        maxGuests: 8,
        bedrooms: 4,
        bathrooms: 3,
        rating: 4.9,
        reviewCount: 124,
        isFeatured: true,
        host: host._id
      }
      // (you can keep rest same — no issue there)
    ];

    await Listing.insertMany(listings);

    console.log('\n✅ Seed data inserted successfully!\n');

    console.log('Login Credentials:');
    console.log('Admin1:', 'admin@basudevbnb.com / admin123');
    console.log('Admin2:', 'basudevnaidu2@gmail.com / basudev@2006');
    console.log('Host:', 'host@basudevbnb.com / host123');
    console.log('User:', 'user@basudevbnb.com / user123');

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    mongoose.connection.close();
  }
};

seedData();