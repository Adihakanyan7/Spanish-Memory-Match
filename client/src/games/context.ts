import { createContext, useContext } from "react";

// Define the type for each card in the deck
type Card = {
  word: string;
  language: string;
  pairIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
  isInvisible: boolean;
  index: number;
};

// Define the type for the deck
type Deck = Card[];

// Define the type for each word pair fetched from the backend
type WordPair = {
  id?: number;
  spanish: string;
  hebrew: string;
  category?: string;
};

// Define the type for the array of word pairs
type Words = WordPair[];

type numOfPairs = number ;

type Content = {
    level: string;
    category: string;
} ;

// Extend the context type to include the deck, setDeck, words, and setWords
type DeckContextType = {
  deck: Deck;
  setDeck: React.Dispatch<React.SetStateAction<Deck>>;
  words: Words;
  setWords: React.Dispatch<React.SetStateAction<Words>>;
  numOfPairs: numOfPairs,
  setNumOfPairs : React.Dispatch<React.SetStateAction<numOfPairs>>;
  content : Content,
  setContent : React.Dispatch<React.SetStateAction<Content>>;
};



// Create the context with the new type
export const DeckContext = createContext<DeckContextType | undefined>(undefined);

// Update the useDeckContext hook to return the new context structure
export function useDeckContext(): DeckContextType {
  const context = useContext(DeckContext);

  if (context === undefined) {
    throw new Error('useDeckContext must be used within a DeckContext.Provider');
  }

  return context;
}
