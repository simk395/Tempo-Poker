export default class Deck{
    constrcutor(id = null, remaining = null){
        this.id = id;
        this.remaining = id;
    }

    async getDeck(){
        try{
            const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            const data = await res.json();
            this.id = data.deck_id;
            this.reamaining = data.remaining;
            return this;
        }catch(err){
            console.log("failed to get deck");
        }
        
    }

    async draw(id){
        try{
            const res = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
            const data = await res.json();
            this.remaining = data.remaining;
            return data.cards[0];
        }catch(err){
            console.log("failed to draw from deck");
        }
    }
}