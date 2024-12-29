import React from 'react';
import { Copy, ZoomIn, X } from 'lucide-react';
import { RecognizedImage } from '../types/image';
import { copyToClipboard } from '../utils/clipboard';

interface ImageCardProps {
  image: RecognizedImage;
  onImageClick: (image: RecognizedImage) => void;
}

export function ImageCard({ image, onImageClick }: ImageCardProps) {
  const [isZoomed, setIsZoomed] = React.useState(false);

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      onImageClick(image);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={image.url}
          alt="Uploaded"
          className="w-full h-48 object-cover cursor-pointer"
          onClick={handleZoom}
        />
        <button
          onClick={handleZoom}
          className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          {isZoomed ? (
            <X className="w-4 h-4" />
          ) : (
            <ZoomIn className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-600 flex-1">{image.text}</p>
          <button
            onClick={() => copyToClipboard(image.text)}
            className="ml-2 p-2 text-gray-500 hover:text-gray-700"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}