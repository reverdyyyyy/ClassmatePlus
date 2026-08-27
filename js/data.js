/* ==========================================================================
   ClassmatePlus — sample data
   Shape (per Week 1 plan):
   Skill:   { id, name, category, description, owner }
   Student: { id, name, avatarInitials, campus, bio, skillsOffered[], skillsWanted[] }
   No backend yet — this file stands in for the future API.
   ========================================================================== */

const CATEGORIES = ["Design", "Code", "Writing", "Music", "Languages", "Math & Stats", "Media"];

const STUDENTS = [
  {
    id: "s1",
    name: "Priya Nandakumar",
    initials: "PN",
    campus: "Junior · Computer Science",
    bio: "I build things that break less often than they should. Happy to trade code help for anything Adobe-related — my Photoshop skills stalled out in 2019.",
    skillsOffered: ["Excel Modeling", "Python Debugging", "Git & GitHub Basics"],
    skillsWanted: ["Photoshop", "Logo Design"]
  },
  {
    id: "s2",
    name: "Marcus Webb",
    initials: "MW",
    campus: "Senior · Graphic Design",
    bio: "Design is 90% patience and 10% keyboard shortcuts. Can help with branding, layout, or a portfolio review in exchange for stats help before finals.",
    skillsOffered: ["Photoshop", "Logo Design", "Figma Prototyping"],
    skillsWanted: ["Statistics Tutoring", "Excel Modeling"]
  },
  {
    id: "s3",
    name: "Aiko Tanaka",
    initials: "AT",
    campus: "Sophomore · Linguistics",
    bio: "Native Japanese speaker, conversational in three others. Trading language practice for literally anything music-related — I can't read sheet music.",
    skillsOffered: ["Japanese Conversation", "Essay Editing"],
    skillsWanted: ["Guitar Basics", "Music Theory"]
  },
  {
    id: "s4",
    name: "Devon Marsh",
    initials: "DM",
    campus: "Senior · Music Performance",
    bio: "Guitar, piano, basic production. Looking to finally understand my own tax situation before I graduate — accounting help welcome.",
    skillsOffered: ["Guitar Basics", "Music Theory", "Audio Mixing"],
    skillsWanted: ["Accounting Basics", "Resume Review"]
  },
  {
    id: "s5",
    name: "Fatima Al-Sayed",
    initials: "FA",
    campus: "Junior · Accounting",
    bio: "I can make a spreadsheet cry tears of joy. Want to get better at public speaking before my internship interviews start.",
    skillsOffered: ["Accounting Basics", "Excel Modeling", "Resume Review"],
    skillsWanted: ["Public Speaking", "Interview Prep"]
  },
  {
    id: "s6",
    name: "Owen Castillo",
    initials: "OC",
    campus: "Sophomore · Theatre",
    bio: "Improv team captain, comfortable in front of a crowd. Need someone to make my group project slides look less like a ransom note.",
    skillsOffered: ["Public Speaking", "Interview Prep", "Voice Coaching"],
    skillsWanted: ["Figma Prototyping", "Slide Design"]
  },
  {
    id: "s7",
    name: "Lena Petrov",
    initials: "LP",
    campus: "Senior · Mathematics",
    bio: "Tutored calc and stats for three years. My essays, on the other hand, need serious help before grad school apps go out.",
    skillsOffered: ["Statistics Tutoring", "Calculus Help"],
    skillsWanted: ["Essay Editing", "Personal Statement Review"]
  },
  {
    id: "s8",
    name: "Jordan Reyes",
    initials: "JR",
    campus: "Junior · English",
    bio: "Editing essays and personal statements is basically my love language. Trying to learn enough SQL to not panic during my data internship.",
    skillsOffered: ["Essay Editing", "Personal Statement Review"],
    skillsWanted: ["SQL Basics", "Python Debugging"]
  }
];

// Flattened skill listings (what shows on Browse Skills)
const SKILLS = [
  { id: "k1", name: "Excel Modeling", category: "Math & Stats", description: "Build formulas, pivot tables, and models that don't fall apart when someone else opens them.", ownerId: "s1" },
  { id: "k2", name: "Python Debugging", category: "Code", description: "Rubber-duck your way through stack traces with someone who's seen it before.", ownerId: "s1" },
  { id: "k3", name: "Photoshop", category: "Design", description: "Compositing, retouching, and getting your poster print-ready.", ownerId: "s2" },
  { id: "k4", name: "Logo Design", category: "Design", description: "Turn a vague club idea into a mark people actually remember.", ownerId: "s2" },
  { id: "k5", name: "Figma Prototyping", category: "Design", description: "Click-through prototypes for your app idea or capstone project.", ownerId: "s2" },
  { id: "k6", name: "Japanese Conversation", category: "Languages", description: "Casual conversation practice, no textbook required.", ownerId: "s3" },
  { id: "k7", name: "Essay Editing", category: "Writing", description: "Line edits and structural feedback before your deadline, not after.", ownerId: "s3" },
  { id: "k8", name: "Guitar Basics", category: "Music", description: "Chords, strumming patterns, and how to stop hating barre chords.", ownerId: "s4" },
  { id: "k9", name: "Music Theory", category: "Music", description: "Scales, key signatures, and why that chord progression works.", ownerId: "s4" },
  { id: "k10", name: "Audio Mixing", category: "Media", description: "Clean up a podcast or demo track in an afternoon.", ownerId: "s4" },
  { id: "k11", name: "Accounting Basics", category: "Math & Stats", description: "Debits, credits, and understanding your own tax forms.", ownerId: "s5" },
  { id: "k12", name: "Resume Review", category: "Writing", description: "Line-by-line pass so your bullet points actually say something.", ownerId: "s5" },
  { id: "k13", name: "Public Speaking", category: "Media", description: "Structure a talk and survive the Q&A after.", ownerId: "s6" },
  { id: "k14", name: "Interview Prep", category: "Media", description: "Mock interviews with real feedback, not just \"good job.\"", ownerId: "s6" },
  { id: "k15", name: "Voice Coaching", category: "Media", description: "Projection, pacing, and not sounding like you're reading a script.", ownerId: "s6" },
  { id: "k16", name: "Statistics Tutoring", category: "Math & Stats", description: "Hypothesis testing and regression, explained without the textbook jargon.", ownerId: "s7" },
  { id: "k17", name: "Calculus Help", category: "Math & Stats", description: "Derivatives, integrals, and the intuition behind both.", ownerId: "s7" },
  { id: "k18", name: "Personal Statement Review", category: "Writing", description: "Grad-school essays that sound like you, not a template.", ownerId: "s8" }
];

function getOwner(ownerId){
  return STUDENTS.find(s => s.id === ownerId);
}

// The "logged in" demo user for Dashboard / matching logic
const CURRENT_USER = {
  id: "me",
  name: "Sam Okafor",
  initials: "SO",
  campus: "Junior · Marketing",
  bio: "Trying to trade my spreadsheet skills for basically anything creative.",
  skillsOffered: ["Excel Modeling", "Resume Review"],
  skillsWanted: ["Logo Design", "Photoshop", "Public Speaking"]
};

// Demo swap requests, so Dashboard has real-looking state on first load
const SWAP_REQUESTS = [
  { id: "r1", withId: "s2", direction: "sent", offered: "Excel Modeling", wanted: "Logo Design", status: "pending" },
  { id: "r2", withId: "s6", direction: "sent", offered: "Resume Review", wanted: "Public Speaking", status: "accepted" },
  { id: "r3", withId: "s5", direction: "received", offered: "Accounting Basics", wanted: "Excel Modeling", status: "pending" },
  { id: "r4", withId: "s2", direction: "sent", offered: "Excel Modeling", wanted: "Photoshop", status: "done" }
];
