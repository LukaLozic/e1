import HomePage from "../HomePage";
import type { Metadata } from "next";

// This function allows you to set dynamic meta tags based on the route params
export async function generateMetadata(
  { params }: { params: { gender: string } }
): Promise<Metadata> {
  const gender = params.gender?.toLowerCase() || "";
  let title = "Nøgne modeller live – Kvinder, mænd og trans på cam";
  let description = "Se de frækkeste live shows med nøgne piger, mænd, par og transpersoner. Kneppe-me.dk – alt samlet ét sted!";

  if (gender === "nogne-damer") {
    title = "Nøgne damer live – Se frække piger på Kneppe-me.dk";
    description = "Se modne og unge nøgne kvinder live – ingen tilmelding. Eksklusivt erotisk indhold med danske piger kun på Kneppe-me.dk!";
  } else if (gender === "nogne-mænd") {
    title = "Nøgne mænd live – Se liderlige fyre på Kneppe-me.dk";
    description = "Se unge og modne mænd vise alt live – ingen tilmelding. Eksklusivt erotisk indhold med danske fyre kun på Kneppe-me.dk!";
  } else if (gender === "par") {
    title = "Par knalder live på cam – Se det på Kneppe-me.dk";
    description = "Hundredvis af par knalder live for dig – ingen tilmelding. Eksklusivt live indhold med danske par kun på Kneppe-me.dk!";
  } else if (gender === "trans") {
    title = "Transsexuelle live – Se shemales på Kneppe-me.dk";
    description = "Se smukke transpersoner og shemales vise alt live – ingen tilmelding. Eksklusivt trans indhold kun på Kneppe-me.dk!";
  }

  return { title, description };
}

// This is a Server Component (default in app router)
export default function GenderPage({ params }: { params: { gender: string } }) {
  return <HomePage genderParam={params.gender} />;
}