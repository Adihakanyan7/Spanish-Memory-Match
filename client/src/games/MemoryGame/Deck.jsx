import { useContext, useEffect,} from "react";
import { DeckContext, useDeckContext } from '../context.ts';




function Deck(props){
  const { words, setDeck, setNumOfPairs , content} = useDeckContext(DeckContext);
  console.log("Deck -> Rendered with words:", words);
  
 

}



export default Deck;
