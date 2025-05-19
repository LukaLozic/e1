import HomePage from "../HomePage";

export default async function GenderPage({ params }: { params: { gender: string } }) {
  return <HomePage genderParam={params.gender} />;
}
