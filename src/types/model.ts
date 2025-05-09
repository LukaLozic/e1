// src/types.ts or top of src/utils/api.ts
export interface Model {
  username: string;
  spoken_languages: string;
  tags: string[];
  current_show: string;
  is_new: boolean;
  num_followers: number;
  birthday: string;
  is_hd: boolean;
  iframe_embed: string;
  seconds_online: number;
  display_name: string;
  gender: string;
  age: number;
  image_url_360x270: string;
  num_users: number;
  chat_room_url: string;
  image_url: string;
  location: string;
  room_subject: string;
  chat_room_url_revshare: string;
  iframe_embed_revshare: string;
  country: string;
}
