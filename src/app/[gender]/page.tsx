import HomePage from "../HomePage";

// This is a Server Component (default in app router)
// Do NOT add "use client" here.
// Typing params explicitly is fine.
export default function GenderPage({ params }: { params: { gender: string } }) {
  return <HomePage genderParam={params.gender} />;
}