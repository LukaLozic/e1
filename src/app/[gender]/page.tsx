import HomePage from "../HomePage";

type Props = { params: { gender: string } };

export default function GenderPage({ params }: Props) {
  return <HomePage genderParam={params.gender} />;
}
