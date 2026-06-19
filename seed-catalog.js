// Catalog Seeder — Run this in browser console after backend is started
// Or run: node seed-catalog.js

const API = 'http://localhost:8090/catalog';

const courses = [
  { courseName: 'Java',                  duration: '6 Months', totalFees: 35000, installments: 3, description: 'Core Java programming course' },
  { courseName: 'English',               duration: '3 Months', totalFees: 25000, installments: 2, description: 'English communication and grammar' },
  { courseName: 'Frontend Development',  duration: '6 Months', totalFees: 25000, installments: 3, description: 'HTML, CSS, JavaScript, React development' },
  { courseName: 'Python',                duration: '5 Months', totalFees: 30000, installments: 3, description: 'Python programming and data science basics' },
  { courseName: 'Java Fullstack',        duration: '1 Year',   totalFees: 45000, installments: 4, description: 'Full-stack Java development with Spring Boot & React' },
  // Standard-wise courses (2 months, 20k each)
  { courseName: '1st Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '1st Standard coaching' },
  { courseName: '2nd Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '2nd Standard coaching' },
  { courseName: '3rd Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '3rd Standard coaching' },
  { courseName: '4th Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '4th Standard coaching' },
  { courseName: '5th Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '5th Standard coaching' },
  { courseName: '6th Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '6th Standard coaching' },
  { courseName: '7th Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '7th Standard coaching' },
  { courseName: '8th Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '8th Standard coaching' },
  { courseName: '9th Std',   duration: '2 Months', totalFees: 20000, installments: 2, description: '9th Standard coaching' },
  { courseName: '10th Std',  duration: '2 Months', totalFees: 20000, installments: 2, description: '10th Standard coaching' },
  { courseName: '11th Std',  duration: '2 Months', totalFees: 20000, installments: 2, description: '11th Standard coaching' },
  { courseName: '12th Std',  duration: '2 Months', totalFees: 20000, installments: 2, description: '12th Standard coaching' },
  { courseName: 'UG',        duration: '2 Months', totalFees: 20000, installments: 2, description: 'Under Graduate coaching' },
  { courseName: 'PG',        duration: '2 Months', totalFees: 20000, installments: 2, description: 'Post Graduate coaching' },
  { courseName: 'Diploma',   duration: '2 Months', totalFees: 20000, installments: 2, description: 'Diploma level coaching' },
];

async function seed() {
  for (const course of courses) {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
      });
      const text = await res.text();
      console.log(`✅ ${course.courseName}: ${text}`);
    } catch (err) {
      console.error(`❌ ${course.courseName}: ${err.message}`);
    }
  }
  console.log('🎉 Done seeding catalog!');
}

seed();
