import React from 'react';
import { Language, SUPPORTED_LANGUAGES } from '../types/language';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language" className="text-sm font-medium text-gray-700">
        Recognition Language:
      </label>
      <select
        id="language"
        value={selectedLanguage.code}
        onChange={(e) => {
          const language = SUPPORTED_LANGUAGES.find(lang => lang.code === e.target.value);
          if (language) onLanguageChange(language);
        }}
        className="block w-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}