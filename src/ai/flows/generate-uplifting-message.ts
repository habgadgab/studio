'use server';
/**
 * @fileOverview A Genkit flow for generating a short, uplifting message.
 *
 * - generateUpliftingMessage - A function that generates an uplifting message.
 * - GenerateUpliftingMessageInput - The input type for the generateUpliftingMessage function.
 * - GenerateUpliftingMessageOutput - The return type for the generateUpliftingMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUpliftingMessageInputSchema = z.object({}).describe('Input schema for generating an uplifting message.');
export type GenerateUpliftingMessageInput = z.infer<typeof GenerateUpliftingMessageInputSchema>;

const GenerateUpliftingMessageOutputSchema = z.object({
  message: z.string().describe('A short, uplifting message.'),
});
export type GenerateUpliftingMessageOutput = z.infer<typeof GenerateUpliftingMessageOutputSchema>;

export async function generateUpliftingMessage(
  input: GenerateUpliftingMessageInput
): Promise<GenerateUpliftingMessageOutput> {
  return generateUpliftingMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUpliftingMessagePrompt',
  input: {schema: GenerateUpliftingMessageInputSchema},
  output: {schema: GenerateUpliftingMessageOutputSchema},
  prompt: `You are an AI assistant tasked with generating short, uplifting messages.

Generate a single, concise, and positive message that would bring a smile to someone's face.
The message should be between 10 and 20 words long.

Here are some examples of uplifting messages:
- "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."
- "Every day is a new beginning. Take a deep breath and start again."
- "You are capable of amazing things. Never give up on your dreams."
- "The best way to predict the future is to create it."

Remember to keep it short and genuinely encouraging.`,
});

const generateUpliftingMessageFlow = ai.defineFlow(
  {
    name: 'generateUpliftingMessageFlow',
    inputSchema: GenerateUpliftingMessageInputSchema,
    outputSchema: GenerateUpliftingMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
