// Simple client-side mock API using localStorage.
// Demo-only: OTP is shown in responses for convenience.

// Bump the storage key to reseed with expanded synthetic dataset
const STORAGE_KEY = "mh_demo_db_v2";

function seedIfNeeded() {
  if (localStorage.getItem(STORAGE_KEY)) return;
  const patients = [
    {
      id: "p1",
      uhid: "867159943420",
      name: "Arjun Krishnan",
      age: 32,
      gender: "Male",
      home_state: "Bihar",
      destination_city: "Kochi",
      local_address: "Fort Kochi",
      industry: "Construction",
      phone: "+91 9876543210",
      email: "arjun.krishnan@example.com",
      aadhaar_verified: true,
      password: "patient123",
      temporaryPassword: "Temp@123456",
      baseline_tests: {
        height: 175,
        weight: 70,
        bmi: 22.9,
        blood_sugar: 92,
        bp: "120/80",
        blood_group: "O+",
        hb: 14.2,
      },
      sensitive_flags: { hiv: false, tb: false, dengue: false },
      status: "active",
      visits: [
        {
          id: "v1",
          date: "2024-09-15",
          hospital: "General Hospital Kochi Medical College",
          diagnosis: "Hypertension, Mild Anemia",
          notes:
            "Patient shows improved BP levels and improved cardiac function medication progress. Recommended follow-up.",
          doctor: "Dr. Anil Kumar",
          reports: ["BP Report", "Blood Test Report"],
        },
        {
          id: "v2",
          date: "2024-08-25",
          hospital: "Emergency Care Center AIMS",
          diagnosis: "Acute Gastritis, Dehydration",
          notes:
            "Patient presented with severe stomach pain and vomiting. Treated with IV fluids and anti-emetics.",
          doctor: "Dr. Priya Nair",
          reports: ["Emergency Report"],
        },
      ],
    },
    {
      id: "p2",
      uhid: "867159943421",
      name: "Priya Devi",
      age: 29,
      gender: "Female",
      home_state: "Tamil Nadu",
      destination_city: "Thiruvananthapuram",
      local_address: "Thiruvananthapuram - West",
      industry: "Domestic",
      phone: "+91 9876543211",
      email: "priya.devi@example.com",
      aadhaar_verified: true,
      password: "priya456",
      temporaryPassword: "Temp@789012",
      baseline_tests: {
        height: 158,
        weight: 55,
        bmi: 22.0,
        blood_sugar: 95,
        bp: "110/70",
        blood_group: "A+",
        hb: 12,
      },
      sensitive_flags: { hiv: false, tb: false, dengue: true },
      status: "active",
      visits: [
        {
          id: "v3",
          date: "2024-09-10",
          hospital: "Govt Hospital Thiruvananthapuram",
          diagnosis: "Dengue Fever Recovery",
          notes:
            "Patient recovering well from dengue. Platelet count improving.",
          doctor: "Dr. Suresh Kumar",
          reports: ["Blood Count Report"],
        },
      ],
    },
    {
      id: "p3",
      uhid: "867159943422",
      name: "Ravi Kumar",
      age: 34,
      gender: "Male",
      home_state: "Uttar Pradesh",
      destination_city: "Ernakulam",
      local_address: "Marine Drive, Kochi",
      industry: "Manufacturing",
      phone: "+91 9876543212",
      email: "ravi.kumar@example.com",
      aadhaar_verified: true,
      password: "ravi789",
      temporaryPassword: "Temp@345678",
      baseline_tests: {
        height: 172,
        weight: 75,
        bmi: 25.3,
        blood_sugar: 110,
        bp: "130/85",
        blood_group: "B+",
        hb: 13.5,
      },
      sensitive_flags: { hiv: false, tb: false, dengue: false },
      status: "active",
      visits: [
        {
          id: "v4",
          date: "2024-09-20",
          hospital: "Medical College Hospital Kochi",
          diagnosis: "Routine Health Checkup",
          notes:
            "All parameters normal. Recommended lifestyle changes for weight management.",
          doctor: "Dr. Meera Nair",
          reports: ["Complete Health Report"],
        },
      ],
    },
  ];

  // --- Synthetic dataset (100 additional records) for richer analytics ---
  // This adds variety across gender, age, home_state, destination_city, industry,
  // medical flags, baseline tests, and visit history (2024-2025) so charts look good.
  const firstNamesMale = [
    "Arjun",
    "Ravi",
    "Aman",
    "Vivek",
    "Imran",
    "Faizal",
    "Rakesh",
    "Sunil",
    "Deepak",
    "Rahul",
    "Sanjay",
    "Karan",
    "Suresh",
    "Mahesh",
    "Vikas",
    "Akhil",
    "Dinesh",
    "Pankaj",
    "Nitin",
    "Gaurav",
  ];
  const firstNamesFemale = [
    "Priya",
    "Pooja",
    "Anjali",
    "Kavita",
    "Neha",
    "Asha",
    "Rani",
    "Suman",
    "Meena",
    "Savita",
    "Lakshmi",
    "Anita",
    "Deepa",
    "Nisha",
    "Ritu",
    "Shreya",
    "Geeta",
    "Kiran",
    "Rupa",
    "Swati",
  ];
  const lastNames = [
    "Kumar",
    "Yadav",
    "Sharma",
    "Das",
    "Mandal",
    "Singh",
    "Pal",
    "Roy",
    "Ali",
    "Khan",
    "Devi",
    "Nair",
    "Menon",
    "Prasad",
    "Patel",
    "Verma",
    "Sinha",
    "Ghosh",
    "Mondal",
    "Gupta",
  ];
  const states = [
    "Bihar",
    "Uttar Pradesh",
    "West Bengal",
    "Odisha",
    "Jharkhand",
    "Assam",
    "Rajasthan",
    "Madhya Pradesh",
    "Chhattisgarh",
    "Tamil Nadu",
  ];
  const cities = [
    "Kochi",
    "Ernakulam",
    "Thiruvananthapuram",
    "Thrissur",
    "Kozhikode",
    "Kannur",
    "Alappuzha",
    "Kollam",
    "Palakkad",
    "Kottayam",
    "Malappuram",
  ];
  const streets = [
    "Fort Kochi",
    "MG Road",
    "Banerji Rd",
    "Palarivattom",
    "Edappally",
    "Vyttila",
    "Kaloor",
    "Poonithura",
    "Thevara",
    "Palarivattom North",
  ];
  const industries = [
    "Construction",
    "Manufacturing",
    "Domestic",
    "Agriculture",
    "Fishing",
    "Hospitality",
    "Transport",
    "Retail",
    "Garment",
    "Sanitation",
    "Logistics",
    "Services",
  ];
  const bloodGroups = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"];
  const bpOptions = ["110/70", "120/80", "130/85", "140/90"];
  const hospitalsList = [
    "Government Medical College Kochi",
    "District Hospital Thrissur",
    "Govt Hospital Thiruvananthapuram",
    "Emergency Care Center AIMS",
    "Medical College Hospital Kochi",
  ];
  const diagnoses = [
    "Routine Health Checkup",
    "Hypertension",
    "Type 2 Diabetes",
    "Gastritis",
    "Acute Injury",
    "Viral Fever",
    "TB Screening",
    "Anemia",
    "Upper Respiratory Infection",
    "Dermatitis",
    "Dengue",
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function makeName(gender) {
    const first =
      gender === "Female" ? pick(firstNamesFemale) : pick(firstNamesMale);
    const last = pick(lastNames);
    return `${first} ${last}`;
  }
  function makeUHID(seq) {
    // Ensure 12-digit, unique-ish UHID, offset from existing examples
    const base = 867159950000; // base chosen away from initial seeded UHIDs
    return String(base + seq);
  }
  function makePhone(i) {
    return "+91 " + (9000000000 + i).toString();
  }
  function makeEmail(i) {
    return `migrant${i}@example.com`;
  }
  function makeDateInRange(yearStart = 2024, yearEnd = 2025) {
    const y = rand(yearStart, yearEnd);
    const m = rand(1, 12);
    const d = rand(1, 28); // keep simple
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  }

  const baseCount = patients.length; // currently 3
  for (let i = 1; i <= 100; i++) {
    const gender = Math.random() < 0.48 ? "Female" : "Male";
    const age = rand(18, 58);
    const height = rand(150, 188);
    const weight = rand(45, 92);
    const bmi = +(weight / Math.pow(height / 100, 2)).toFixed(1);
    const sugar = rand(78, 180);
    const hb = +(rand(105, 165) / 10).toFixed(1); // 10.5 - 16.5
    const bg = pick(bloodGroups);
    const state = pick(states);
    const city = pick(cities);
    const addr = pick(streets);
    const industry = pick(industries);

    // Distribute sensitive flags to look realistic for charts
    const dengue = Math.random() < 0.14; // ~14%
    const tb = Math.random() < 0.07; // ~7%
    const hiv = Math.random() < 0.02; // ~2%

    const visitCount = rand(0, 3);
    const visits = [];
    for (let v = 1; v <= visitCount; v++) {
      visits.push({
        id: `v${i}_${v}`,
        date: makeDateInRange(2024, 2025),
        hospital: pick(hospitalsList),
        diagnosis: pick(diagnoses),
        notes: "Auto-generated visit for analytics demo.",
        doctor: pick([
          "Dr. Rajesh Kumar",
          "Dr. Priya Nair",
          "Dr. Anil Sharma",
          "Dr. Meera Nair",
          "Dr. Suresh Kumar",
          "Dr. Lakshmi Menon",
        ]),
        reports: ["Summary Report"],
      });
    }

    const idx = baseCount + i; // sequential id after existing patients
    patients.push({
      id: `p${idx}`,
      uhid: makeUHID(i),
      name: makeName(gender),
      age,
      gender,
      home_state: state,
      destination_city: city,
      local_address: addr,
      industry,
      phone: makePhone(1000 + i),
      email: makeEmail(1000 + i),
      aadhaar_verified: Math.random() < 0.92,
      password: null,
      temporaryPassword: "Temp@" + String(100000 + i),
      baseline_tests: {
        height,
        weight,
        bmi,
        blood_sugar: sugar,
        bp: pick(bpOptions),
        blood_group: bg,
        hb,
      },
      sensitive_flags: { hiv, tb, dengue },
      status: Math.random() < 0.93 ? "active" : "inactive",
      visits,
    });
  }
  // --- End synthetic dataset ---

  const doctors = [
    {
      id: "DR001",
      doctorId: "DR001",
      name: "Dr. Rajesh Kumar",
      specialization: "General Medicine",
      hospital: "Govt Medical College Kochi",
      password: "doctor123",
      email: "rajesh.kumar@medcollege.gov.in",
      phone: "+91 9876543100",
      status: "active",
    },
    {
      id: "DR002",
      doctorId: "DR002",
      name: "Dr. Priya Nair",
      specialization: "Cardiology",
      hospital: "District Hospital Thrissur",
      password: "cardio456",
      email: "priya.nair@district.gov.in",
      phone: "+91 9876543101",
      status: "active",
    },
    {
      id: "DR003",
      doctorId: "DR003",
      name: "Dr. Anil Sharma",
      specialization: "Emergency Medicine",
      hospital: "Emergency Care Center AIMS",
      password: "emergency789",
      email: "anil.sharma@aims.gov.in",
      phone: "+91 9876543102",
      status: "active",
    },
    {
      id: "DR004",
      doctorId: "DR004",
      name: "Dr. Meera Nair",
      specialization: "Internal Medicine",
      hospital: "Medical College Hospital Kochi",
      password: "internal123",
      email: "meera.nair@medcollege.gov.in",
      phone: "+91 9876543103",
      status: "active",
    },
    {
      id: "DR005",
      doctorId: "DR005",
      name: "Dr. Suresh Kumar",
      specialization: "Infectious Diseases",
      hospital: "Govt Hospital Thiruvananthapuram",
      password: "infectious456",
      email: "suresh.kumar@govt.gov.in",
      phone: "+91 9876543104",
      status: "active",
    },
    {
      id: "DR006",
      doctorId: "DR006",
      name: "Dr. Lakshmi Menon",
      specialization: "Pediatrics",
      hospital: "Community Health Centre Kannur",
      password: "pediatric789",
      email: "lakshmi.menon@chc.gov.in",
      phone: "+91 9876543105",
      status: "active",
    },
    {
      id: "DR007",
      doctorId: "DR007",
      name: "Dr. Vishnu Prakash",
      specialization: "Orthopedics",
      hospital: "Govt Medical College Kochi",
      password: "ortho123",
      email: "vishnu.prakash@medcollege.gov.in",
      phone: "+91 9876543106",
      status: "active",
    },
    {
      id: "DR008",
      doctorId: "DR008",
      name: "Dr. Sita Devi",
      specialization: "Gynecology",
      hospital: "District Hospital Thrissur",
      password: "gyneco456",
      email: "sita.devi@district.gov.in",
      phone: "+91 9876543107",
      status: "active",
    },
    {
      id: "DR009",
      doctorId: "DR009",
      name: "Dr. Ravi Menon",
      specialization: "Pulmonology",
      hospital: "Emergency Care Center AIMS",
      password: "pulmo789",
      email: "ravi.menon@aims.gov.in",
      phone: "+91 9876543108",
      status: "active",
    },
    {
      id: "DR010",
      doctorId: "DR010",
      name: "Dr. Kavitha Nair",
      specialization: "Dermatology",
      hospital: "Medical College Hospital Kochi",
      password: "derma123",
      email: "kavitha.nair@medcollege.gov.in",
      phone: "+91 9876543109",
      status: "active",
    },
  ];

  // Admin credentials
  const admins = [
    {
      id: "ADMIN001",
      username: "admin",
      password: "admin@123",
      name: "System Administrator",
      email: "admin@migrantHealth.gov.in",
      role: "super_admin",
      permissions: [
        "all_access",
        "user_management",
        "system_settings",
        "analytics",
        "reports",
      ],
      status: "active",
      created_at: "2024-01-01T00:00:00.000Z",
      last_login: null,
    },
    {
      id: "ADMIN002",
      username: "healthadmin",
      password: "health@456",
      name: "Health Program Administrator",
      email: "healthadmin@migrantHealth.gov.in",
      role: "health_admin",
      permissions: [
        "patient_management",
        "doctor_management",
        "analytics",
        "reports",
      ],
      status: "active",
      created_at: "2024-01-01T00:00:00.000Z",
      last_login: null,
    },
  ];

  // Hospital credentials
  const hospitals = [
    {
      id: "HOSP001",
      hospitalId: "HOSP001",
      hospitalName: "Government Medical College Kochi",
      location: "Kochi, Kerala",
      type: "Government",
      username: "kochi_gmc",
      password: "hospital123",
      email: "admin@gmckochi.gov.in",
      phone: "+91 484-2385760",
      capacity: 1200,
      departments: [
        "General Medicine",
        "Surgery",
        "Cardiology",
        "Pediatrics",
        "Emergency",
      ],
      status: "active",
      established: "1954",
      accreditation: "NABH Accredited",
    },
    {
      id: "HOSP002",
      hospitalId: "HOSP002",
      hospitalName: "District Hospital Thrissur",
      location: "Thrissur, Kerala",
      type: "Government",
      username: "thrissur_dh",
      password: "district456",
      email: "admin@thrissurdh.gov.in",
      phone: "+91 487-2336633",
      capacity: 800,
      departments: [
        "General Medicine",
        "Surgery",
        "Gynecology",
        "Orthopedics",
        "Emergency",
      ],
      status: "active",
      established: "1960",
      accreditation: "NABH Accredited",
    },
  ];

  const otps = []; // { id, uhid, code, expiresAt, used }
  const db = { patients, doctors, admins, hospitals, otps };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function loadDB() {
  seedIfNeeded();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveDB(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function generateUHID() {
  // Generate a 12-digit UHID similar to the existing format
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const uhid = String(timestamp).slice(-9) + String(random).padStart(3, "0");
  return uhid;
}

export async function registerPatient(data) {
  const db = loadDB();
  const uhid = generateUHID();
  const id = "p" + (db.patients.length + 1);
  const temporaryPassword = generateTemporaryPassword();
  const patient = {
    id,
    uhid,
    ...data,
    visits: [],
    baseline_tests: data.baseline_tests || {},
    sensitive_flags: data.sensitive_flags || {},
    status: "active",
    temporaryPassword,
    password: null, // Will be set when patient first logs in
  };
  db.patients.push(patient);
  saveDB(db);
  return { success: true, uhid, patient, temporaryPassword };
}

function generateTemporaryPassword() {
  // Generate a secure temporary password
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function updateNonMedical(uhid, updates, updatedBy = "staff") {
  const db = loadDB();
  const p = db.patients.find((x) => x.uhid === uhid);
  if (!p) return { success: false, error: "UHID not found" };
  const allowed = ["local_address", "industry", "destination_city", "phone"];
  const changes = {};
  allowed.forEach((k) => {
    if (updates[k] !== undefined && updates[k] !== p[k]) {
      changes[k] = { old: p[k], new: updates[k] };
      p[k] = updates[k];
    }
  });
  if (!p.change_log) p.change_log = [];
  p.change_log.push({ updatedBy, changes, at: new Date().toISOString() });
  saveDB(db);
  return {
    success: true,
    patient: {
      uhid: p.uhid,
      name: p.name,
      local_address: p.local_address,
      industry: p.industry,
      destination_city: p.destination_city,
      phone: p.phone,
    },
  };
}

// OTP functions (demo - OTP returned)
export async function generateOtpForUHID(uhid) {
  const db = loadDB();
  const p = db.patients.find((x) => x.uhid === uhid || x.phone === uhid);
  if (!p) return { success: false, error: "Patient not found" };
  const code = String(Math.floor(1000 + Math.random() * 9000));
  const otp = {
    id: "otp" + Date.now(),
    uhid: p.uhid,
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
    used: false,
  };
  db.otps.push(otp);
  saveDB(db);
  // In prod: send SMS. Here return for demo
  return {
    success: true,
    message: "OTP generated (demo)",
    otp: code,
    expiresAt: otp.expiresAt,
  };
}

export async function verifyOtp(uhid, code) {
  const db = loadDB();
  const otp = db.otps.find(
    (o) => o.uhid === uhid && o.code === code && !o.used
  );
  if (!otp) return { success: false, error: "Invalid OTP" };
  if (otp.expiresAt < Date.now())
    return { success: false, error: "OTP expired" };
  otp.used = true;
  saveDB(db);
  // create a simple token (in demo, token is 'token-'+uhid)
  const token = "token-" + uhid + "-" + Date.now();
  return { success: true, token };
}

export async function getPatientNonMedical(uhid) {
  console.log("getPatientNonMedical called with UHID:", uhid);
  const db = loadDB();
  console.log(
    "Database loaded, patients count:",
    db.patients ? db.patients.length : "No patients"
  );

  if (db.patients) {
    console.log(
      "Available UHIDs:",
      db.patients.map((p) => p.uhid)
    );
  }

  const p = db.patients.find((x) => x.uhid === uhid);
  console.log("Patient found:", p ? p.name : "None");

  if (!p) return { success: false, error: "Patient not found" };

  const result = {
    success: true,
    patient: {
      uhid: p.uhid,
      name: p.name,
      age: p.age,
      gender: p.gender,
      home_state: p.home_state,
      destination_city: p.destination_city,
      local_address: p.local_address,
      industry: p.industry,
      phone: p.phone,
      status: p.status,
    },
  };

  console.log("Returning result:", result);
  return result;
}

export async function getPatientMedical(uhid, token = null) {
  // For demo, if token is provided, check it contains uhid
  if (token && !token.includes(uhid))
    return { success: false, error: "Unauthorized - invalid token" };
  const db = loadDB();
  const p = db.patients.find((x) => x.uhid === uhid || x.phone === uhid);
  if (!p) return { success: false, error: "Patient not found" };
  // return full medical
  return { success: true, patient: p };
}

// New function for password authentication
export async function authenticatePatient(identifier, password) {
  console.log("authenticatePatient called with:", identifier, password);
  const db = loadDB();
  console.log(
    "Database loaded. Patients found:",
    db.patients ? db.patients.length : "No patients"
  );

  const p = db.patients.find(
    (x) =>
      x.uhid === identifier ||
      x.phone === identifier ||
      x.phone === `+91 ${identifier}` ||
      x.phone.replace("+91 ", "") === identifier
  );

  console.log("Patient found:", p ? p.name : "None");
  if (!p) return { success: false, error: "Patient not found" };

  console.log(
    "Checking passwords - patient password:",
    p.password,
    "temp password:",
    p.temporaryPassword,
    "provided:",
    password
  );

  // Check password or temporary password
  if (p.password === password || p.temporaryPassword === password) {
    console.log("Password match successful");
    return { success: true, patient: p };
  } else {
    console.log("Password match failed");
    return { success: false, error: "Invalid password" };
  }
}

export async function addVisit(uhid, visit, by = "doctor") {
  const db = loadDB();
  const p = db.patients.find((x) => x.uhid === uhid);
  if (!p) return { success: false, error: "Patient not found" };
  const id = "v" + (p.visits.length + 1) + Date.now();
  const v = { id, ...visit, created_at: new Date().toISOString() };
  p.visits.unshift(v);
  saveDB(db);
  return { success: true, visit: v };
}

export async function uploadReport(uhid, visitId, report) {
  const db = loadDB();
  const p = db.patients.find((x) => x.uhid === uhid);
  if (!p) return { success: false, error: "Patient not found" };
  const v = p.visits.find((x) => x.id === visitId);
  if (!v) return { success: false, error: "Visit not found" };
  if (!v.reports) v.reports = [];
  v.reports.push({
    id: "r" + Date.now(),
    ...report,
    uploaded_at: new Date().toISOString(),
  });
  saveDB(db);
  return { success: true };
}

export async function getAnalytics() {
  const db = loadDB();
  const patients = db.patients;
  const total = patients.length;
  const byGender = patients.reduce((acc, p) => {
    acc[p.gender] = (acc[p.gender] || 0) + 1;
    return acc;
  }, {});
  const byIndustry = patients.reduce((acc, p) => {
    acc[p.industry] = (acc[p.industry] || 0) + 1;
    return acc;
  }, {});
  const diseases = { hiv: 0, tb: 0, dengue: 0 };
  patients.forEach((p) => {
    if (p.sensitive_flags) {
      if (p.sensitive_flags.hiv) diseases.hiv++;
      if (p.sensitive_flags.tb) diseases.tb++;
      if (p.sensitive_flags.dengue) diseases.dengue++;
    }
  });
  // Additional analytics for charts
  const counts = {
    active: patients.filter((p) => p.status === "active").length,
    inactive: patients.filter((p) => p.status !== "active").length,
  };
  const male = byGender.Male || 0;
  const female = byGender.Female || 0;
  const genderPct = {
    male: total ? +((100 * male) / total).toFixed(1) : 0,
    female: total ? +((100 * female) / total).toFixed(1) : 0,
  };
  const ageGroups = {
    "18-25": 0,
    "26-35": 0,
    "36-45": 0,
    "46-55": 0,
    "56+": 0,
  };
  patients.forEach((p) => {
    const a = p.age || 0;
    if (a >= 18 && a <= 25) ageGroups["18-25"]++;
    else if (a <= 35) ageGroups["26-35"]++;
    else if (a <= 45) ageGroups["36-45"]++;
    else if (a <= 55) ageGroups["46-55"]++;
    else ageGroups["56+"]++;
  });
  // Disease tracker using baseline + visits
  const diseaseTracker = { diabetes: 0, hypertension: 0, cardiovascular: 0 };
  patients.forEach((p) => {
    const sugar = p.baseline_tests?.blood_sugar;
    const bp = p.baseline_tests?.bp || "";
    const age = p.age || 0;
    const visitDx = (p.visits || []).map((v) =>
      (v.diagnosis || "").toLowerCase()
    );
    const hasDiabetes =
      (typeof sugar === "number" && sugar >= 126) ||
      visitDx.some((d) => d.includes("diabetes"));
    const hasHTN =
      ["130/85", "140/90"].includes(bp) ||
      visitDx.some((d) => d.includes("hypertension"));
    const hasCardio =
      bp === "140/90" || age >= 45 || visitDx.some((d) => d.includes("cardio"));
    if (hasDiabetes) diseaseTracker.diabetes++;
    if (hasHTN) diseaseTracker.hypertension++;
    if (hasCardio) diseaseTracker.cardiovascular++;
  });
  return {
    success: true,
    total,
    byGender,
    byIndustry,
    diseases,
    counts,
    genderPct,
    ageGroups,
    diseaseTracker,
  };
}

// Doctor Authentication Functions
export async function doctorLogin(doctorId, password) {
  const db = loadDB();

  if (!db.doctors || db.doctors.length === 0) {
    console.error("No doctors found in database. Resetting database...");
    await resetDatabase();
    const newDb = loadDB();
    if (!newDb.doctors || newDb.doctors.length === 0) {
      return { success: false, error: "Database initialization failed" };
    }
  }

  const doctor = db.doctors.find(
    (d) => d.doctorId === doctorId && d.password === password
  );

  if (!doctor) {
    return { success: false, error: "Invalid Doctor ID or Password" };
  }

  if (doctor.status !== "active") {
    return { success: false, error: "Doctor account is not active" };
  }

  // Create a simple token for the doctor session
  const token = "doctor-token-" + doctorId + "-" + Date.now();

  return {
    success: true,
    token,
    doctor: {
      id: doctor.id,
      doctorId: doctor.doctorId,
      name: doctor.name,
      specialization: doctor.specialization,
      hospital: doctor.hospital,
      email: doctor.email,
      phone: doctor.phone,
    },
  };
}

export async function verifyDoctorToken(token) {
  // Simple token verification (in a real app, this would be more secure)
  if (token && token.startsWith("doctor-token-")) {
    return { success: true, valid: true };
  }
  return { success: false, valid: false, error: "Invalid token" };
}

export async function getDoctorByToken(token) {
  const db = loadDB();
  // Extract doctorId from token (simplified approach)
  const tokenParts = token.split("-");
  if (tokenParts.length >= 3) {
    const doctorId = tokenParts[2];
    const doctor = db.doctors.find((d) => d.doctorId === doctorId);
    if (doctor) {
      return {
        success: true,
        doctor: {
          id: doctor.id,
          doctorId: doctor.doctorId,
          name: doctor.name,
          specialization: doctor.specialization,
          hospital: doctor.hospital,
          email: doctor.email,
          phone: doctor.phone,
        },
      };
    }
  }
  return { success: false, error: "Doctor not found" };
}

export async function getDoctorPatientDetails(uhid, doctorToken) {
  // Verify doctor token first
  const tokenVerification = await verifyDoctorToken(doctorToken);
  if (!tokenVerification.success) {
    return { success: false, error: "Unauthorized access" };
  }

  const db = loadDB();
  const patient = db.patients.find((p) => p.uhid === uhid);

  if (!patient) {
    return { success: false, error: "Patient not found" };
  }

  // Return comprehensive patient details for doctors
  return {
    success: true,
    patient: {
      uhid: patient.uhid,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      home_state: patient.home_state,
      destination_city: patient.destination_city,
      local_address: patient.local_address,
      industry: patient.industry,
      phone: patient.phone,
      email: patient.email,
      aadhaar_verified: patient.aadhaar_verified,
      baseline_tests: patient.baseline_tests,
      sensitive_flags: patient.sensitive_flags,
      status: patient.status,
      visits: patient.visits,
    },
  };
}

// Admin Authentication Functions
export async function adminLogin(username, password) {
  console.log("adminLogin called with:", username, password);
  const db = loadDB();
  console.log(
    "Database loaded. Admins found:",
    db.admins ? db.admins.length : "No admins"
  );

  if (!db.admins || db.admins.length === 0) {
    console.error("No admins found in database. Resetting database...");
    await resetDatabase();
    const newDb = loadDB();
    console.log(
      "After reset, admins found:",
      newDb.admins ? newDb.admins.length : "No admins"
    );
    if (!newDb.admins || newDb.admins.length === 0) {
      return { success: false, error: "Database initialization failed" };
    }
    // Update db reference after reset
    db.admins = newDb.admins;
  }

  console.log(
    "Available admins:",
    db.admins.map((a) => ({ username: a.username, password: a.password }))
  );

  const admin = db.admins.find(
    (a) => a.username === username && a.password === password
  );

  console.log("Admin found:", admin ? admin.username : "None");

  if (!admin) {
    return { success: false, error: "Invalid username or password" };
  }

  if (admin.status !== "active") {
    return { success: false, error: "Admin account is not active" };
  }

  // Update last login
  admin.last_login = new Date().toISOString();
  saveDB(db);

  // Create a simple token for the admin session
  const token = "admin-token-" + username + "-" + Date.now();

  return {
    success: true,
    token,
    admin: {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
    },
  };
}

export async function verifyAdminToken(token) {
  // Simple token verification (in a real app, this would be more secure)
  if (token && token.startsWith("admin-token-")) {
    return { success: true, valid: true };
  }
  return { success: false, valid: false, error: "Invalid token" };
}

export async function getAdminByToken(token) {
  const db = loadDB();
  // Extract username from token (simplified approach)
  const tokenParts = token.split("-");
  if (tokenParts.length >= 3) {
    const username = tokenParts[2];
    const admin = db.admins.find((a) => a.username === username);
    if (admin) {
      return {
        success: true,
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          permissions: admin.permissions,
        },
      };
    }
  }
  return { success: false, error: "Admin not found" };
}

// Hospital Authentication Functions
export async function hospitalLogin(username, password) {
  console.log("hospitalLogin called with:", username, password);
  const db = loadDB();
  console.log(
    "Database loaded. Hospitals found:",
    db.hospitals ? db.hospitals.length : "No hospitals"
  );

  if (!db.hospitals || db.hospitals.length === 0) {
    console.error("No hospitals found in database. Resetting database...");
    await resetDatabase();
    const newDb = loadDB();
    console.log(
      "After reset, hospitals found:",
      newDb.hospitals ? newDb.hospitals.length : "No hospitals"
    );
    if (!newDb.hospitals || newDb.hospitals.length === 0) {
      return { success: false, error: "Database initialization failed" };
    }
    // Update db reference after reset
    db.hospitals = newDb.hospitals;
  }

  console.log(
    "Available hospitals:",
    db.hospitals.map((h) => ({
      username: h.username,
      hospitalName: h.hospitalName,
    }))
  );

  const hospital = db.hospitals.find(
    (h) => h.username === username && h.password === password
  );

  console.log("Hospital found:", hospital ? hospital.hospitalName : "None");

  if (!hospital) {
    return { success: false, error: "Invalid username or password" };
  }

  if (hospital.status !== "active") {
    return { success: false, error: "Hospital account is not active" };
  }

  // Create a simple token for the hospital session
  const token = "hospital-token-" + username + "-" + Date.now();

  return {
    success: true,
    token,
    hospital: {
      id: hospital.id,
      hospitalId: hospital.hospitalId,
      hospitalName: hospital.hospitalName,
      location: hospital.location,
      type: hospital.type,
      username: hospital.username,
      email: hospital.email,
      phone: hospital.phone,
      capacity: hospital.capacity,
      departments: hospital.departments,
      established: hospital.established,
      accreditation: hospital.accreditation,
    },
  };
}

export async function verifyHospitalToken(token) {
  // Simple token verification (in a real app, this would be more secure)
  if (token && token.startsWith("hospital-token-")) {
    return { success: true, valid: true };
  }
  return { success: false, valid: false, error: "Invalid token" };
}

export async function getHospitalByToken(token) {
  const db = loadDB();
  // Extract username from token (simplified approach)
  const tokenParts = token.split("-");
  if (tokenParts.length >= 3) {
    const username = tokenParts[2];
    const hospital = db.hospitals.find((h) => h.username === username);
    if (hospital) {
      return {
        success: true,
        hospital: {
          id: hospital.id,
          hospitalId: hospital.hospitalId,
          hospitalName: hospital.hospitalName,
          location: hospital.location,
          type: hospital.type,
          username: hospital.username,
          email: hospital.email,
          phone: hospital.phone,
          capacity: hospital.capacity,
          departments: hospital.departments,
          established: hospital.established,
          accreditation: hospital.accreditation,
        },
      };
    }
  }
  return { success: false, error: "Hospital not found" };
}

// Function to reset database for testing
export async function resetDatabase() {
  console.log("Resetting database...");
  localStorage.removeItem(STORAGE_KEY);
  seedIfNeeded();
  const db = loadDB();
  console.log(
    "Database reset complete. Admins available:",
    db.admins ? db.admins.length : "No admins"
  );
  return { success: true, message: "Database reset successfully" };
}

const mockApi = {
  registerPatient,
  updateNonMedical,
  generateOtpForUHID,
  verifyOtp,
  getPatientNonMedical,
  getPatientMedical,
  authenticatePatient,
  addVisit,
  uploadReport,
  getAnalytics,
  resetDatabase,
  doctorLogin,
  verifyDoctorToken,
  getDoctorByToken,
  getDoctorPatientDetails,
  adminLogin,
  verifyAdminToken,
  getAdminByToken,
  hospitalLogin,
  verifyHospitalToken,
  getHospitalByToken,
};

// For debugging - make available globally
if (typeof window !== "undefined") {
  window.mockApi = mockApi;
}

export default mockApi;
