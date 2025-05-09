import { notFound } from 'next/navigation';
import { Model } from '@/types/model';
import { fetchModels } from '@/utils/api';

interface Props {
  params: {
    username: string;
  };
}

// Generate dynamic metadata for the page
export async function generateMetadata({ params }: Props) {
  const models = await fetchModels();
  const model = models.find((m) => m.username === params.username);
  if (!model) {
    return { title: 'Model Not Found' };
  }
  return {
    title: `${model.display_name} - Chaturbate Model`,
    description: `Watch ${model.display_name} live on Chaturbate.`,
  };
}

// Main page component
export default async function ModelPage({ params }: Props) {
  const models = await fetchModels();
  const model = models.find((m) => m.username === params.username) || null;

  if (!model) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-4">{model.display_name}</h1>
      <img
        src={model.image_url}
        alt={model.display_name}
        className="w-full max-w-md rounded my-4"
      />
      <p className="text-gray-600">Age: {model.age}</p>
      <p className="text-gray-600">Location: {model.location}</p>
      <p className="text-gray-600">Viewers: {model.num_users}</p>
      <a
        href={model.chat_room_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
      >
        Visit Room
      </a>
    </div>
  );
}