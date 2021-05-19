export default class Deck{
    constrcutor(id = null, remaining = null){
        this.id = id;
        this.remaining = id;
    }

    async getDeck(id = "new"){
        try{
             // Request data from the Deck of Cards API through a proxy server. The data is parsed into an object to be accessible for Javascript.
            // log errors into the console upon a status that is not success (200)
            const res = await fetch(`https://ancient-eyrie-20832.herokuapp.com/https://deckofcardsapi.com/api/deck/${id}/shuffle/?deck_count=1`);
            if(res.status != 200) throw Error;
            const data = await res.json();
            this.id = data.deck_id;
            this.remaining = data.remaining;
            return this;
        }catch(err){
            throw new Error("Failed to retrieve deck")
        }
    }

    // attempt to draw a card from the deck
    async draw(id){
        try{
            const res = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
            if(res.status != 200) throw Error;
            const data = await res.json();
            this.remaining = data.remaining;
            return data.cards[0];
        }catch(err){
            throw new Error("Failed to draw card");
        }
    }
}