import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { genre, mood, length } = req.body;

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that recommends books based on user preferences."
          },
          {
            role: "user",
            content: `Recommend a book with the following criteria:
            Genre: ${genre}
            Reader's current mood: ${mood}
            Preferred book length: ${length}
            Please provide the title, author, and a brief description of why this book fits the criteria.`
          }
        ],
      });

      const recommendation = completion.data.choices[0].message.content;

      res.status(200).json({ recommendation });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while getting the recommendation.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
