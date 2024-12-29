import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { ImageCard } from './ImageCard';
import { ImageModal } from './ImageModal';
import { LanguageSelector } from './LanguageSelector';
import { RecognizedImage } from '../types/image';
import { Language, SUPPORTED_LANGUAGES } from '../types/language';
import { performOCR } from '../utils/ocr';
import { Loader2 } from 'lucide-react';

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<RecognizedImage | null>(null);
  const [images, setImages] = useState<RecognizedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsProcessing(true);
    const newImages: RecognizedImage[] = [];
    
    try {
      for (const file of files) {
        const imageUrl = URL.createObjectURL(file);
        const recognizedText = await performOCR(file, selectedLanguage.code);
        
        newImages.push({
          id: Math.random().toString(36).substring(7),
          url: imageUrl,
          text: recognizedText
        });
      }

      setImages([...images, ...newImages]);
    } catch (error) {
      console.error('Error processing images:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
        <ImageUpload onFileSelect={handleFileSelect} disabled={isProcessing} />
        {isProcessing && (
          <div className="mt-4 flex items-center justify-center text-gray-600">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            <span>Processing images...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onImageClick={setSelectedImage}
          />
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}