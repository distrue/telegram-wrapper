import Axios from 'axios';

interface Message {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    language_code: string;
  },
  chat: {
    id: number;
    first_name: string;
    last_name: string;
    type: string;
  },
  date: number;
  text: string;
}

interface Telegrambot {
  token: string;
  value: string;
}

class Telegrambot {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getUpdates() {
    const res = await Axios.get(`https://api.telegram.org/bot${this.token}/getUpdates`);
    if(!res.data || res.data.ok === false) return [];
    return (res.data.result as Message[]);
  }

  async sendMessage(chatId: number, message: string) {
    const data = encodeURI(message);
    const res = await Axios.get(`https://api.telegram.org/bot${this.token}/sendmessage?chat_id=${chatId}&text=${data}`);
    return res.data;
  }
}

export const connectBot = (token: string) => {
  return new Telegrambot(token);
}
