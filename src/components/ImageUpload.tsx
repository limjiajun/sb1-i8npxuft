import React from 'react';
import { FileImage } from 'lucide-react';

interface ImageUploadProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function ImageUpload({ onFileSelect, disabled }: ImageUploadProps) {
  return (
    <label 
      htmlFor="image-upload"
      className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'
      } focus:outline-none`}
    >
      <div className="flex flex-col items-center space-y-2">
        <FileImage className="w-8 h-8 text-gray-400" />
        <span className="font-medium text-gray-600">
          {disabled ? 'Processing...' : 'Drop images here or click to select'}
        </span>
      </div>
      <input
        id="image-upload"
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={onFileSelect}
        disabled={disabled}
      />
    </label>
  );
}