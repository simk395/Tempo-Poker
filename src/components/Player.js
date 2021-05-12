export default class Player{
    constructor(id, name, color, space, items){
        this.id = id;
        this.name = name;
        this.color = color;
        this.space = space;
        this.items = items;
    }   

    move(distance){
        this.space += distance;
    }

    addCard(card){
        this.items[card.code] = card;
    }

    useCard(cards){
        switch(cards.length){
            case 2: 
                if(cards[0][0] === cards[1][0]) return 2;
                else return 0;
            case 3:
                if(cards[0][0] === cards[1][0] && cards[0][0] == cards[2][0]) return 3;
                else return 0;
            case 4:
                let counter = {};
                cards.forEach(card => {
                    let number = card[0];
                    counter[number] ? counter[number]++ : counter[number] = 1;
                })
                if(Object.keys(counter).length === 2){
                    const product =  Object.values(counter).reduce( (acc,val) => acc * val);
                    if(product === 4) return 3;
                    else return 0;
                }else{
                    return 0;
                }
            case 5:
                const rank = "234567890JQKA";
                cards = cards.sort( (a,b) => rank.indexOf(a[0]) - rank.indexOf(b[0]) );
                let straight = true;
                let flush = true;
                let flushSet = new Set();
                let combination = {};

                cards.forEach( (card, i) => {
                    let first = rank.indexOf(cards[0][0])
                    let val = rank.indexOf(card[0]);
                    let suit = card[1];
                    if(val - i !== first) straight = false;
                    flushSet.add(suit);
                    if(flushSet.size > 1) flush = false;
                    let number = card[0];
                    combination[number] ? combination[number]++ : combination[number] = 1;
                })

                if(straight && flush) return 9;
                else if(flush) return 6;
                else if(straight) return 5; 
                else if(Object.keys(combination).length === 2){
                    let values = Object.values(combination);
                    if(values[0] === 2 || values[0] === 3) return 7;
                    else return 8;
                }
                return 0;

            default: return 0;
        }
    }
}