import React from 'react';
import { Copy, X } from 'lucide-react';
import { RecognizedImage } from '../types/image';
import { copyToClipboard } from '../utils/clipboard';

interface ImageModalProps {
  image: RecognizedImage;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-6xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 z-10"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="p-6">
          <div className="relative">
            <img
              src={image.url}
              alt="Selected"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
          
          <div className="mt-6 flex justify-between items-start bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 flex-1 whitespace-pre-wrap">{image.text}</p>
            <button
              onClick={() => copyToClipboard(image.text)}
              className="ml-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
              title="Copy text"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}