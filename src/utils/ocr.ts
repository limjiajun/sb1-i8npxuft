import { createWorker } from 'tesseract.js';

export const performOCR = async (file: File, language: string): Promise<string> => {
  try {
    const worker = await createWorker(language);
    const imageUrl = URL.createObjectURL(file);
    const { data: { text } } = await worker.recognize(imageUrl);
    await worker.terminate();
    URL.revokeObjectURL(imageUrl);
    return text || 'No text detected';
  } catch (error) {
    console.error('OCR Error:', error);
    return 'Error processing image';
  }
};