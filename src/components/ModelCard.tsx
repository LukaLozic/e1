import { FC } from 'react';
import Link from 'next/link';
import { Model } from '@/types/model';

interface Props {
  model: Model;
}

const ModelCard: FC<Props> = ({ model }) => (
  <div className="border rounded p-4 shadow hover:shadow-lg transition">
    <Link href={model.chat_room_url}>
      <a target="_blank" rel="noopener noreferrer">
        <img
          src={model.image_url}
          alt={model.display_name}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="mt-2 text-xl font-semibold">{model.display_name}</h2>
        <p className="text-gray-600">Age: {model.age}</p>
        <p className="text-gray-600">Location: {model.location}</p>
        <p className="text-gray-600">Viewers: {model.num_users}</p>
      </a>
    </Link>
  </div>
);

export default ModelCard;