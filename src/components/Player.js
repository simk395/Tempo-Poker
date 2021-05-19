export default class Player{
    constructor(id, name, color, space, items){
        this.id = id;
        this.name = name;
        this.color = color;
        this.space = space;
        this.items = items;
        this.speed = 0;
    }   

    // sets position
    move(size, distance){
        this.space += distance;
        if(this.space > size){
            this.space = size;
        }
    }

    // add card to inventory
    addCard(card){
        this.items.cards[card.code] = card;
    }

    // add food to inventory.
    // If the food exists then add another one
    addFood(food){
        let item = this.items.foods;
        item[food.food_name] ? item[food.food_name] = [...item[food.food_name],food] : item[food.food_name] = [food];
    }

    // Card Validation System
    // return are values used to index the ranking of foods to be obtained
    useCard(cards){
        // check for length
        switch(cards.length){
            case 2: 
            // In a pair, the system needs to check if the cards have the same numbers
                if(cards[0][0] === cards[1][0]) return 1;
                else return 0;
            case 3:
            // In a three of a kind, the system needs to check if all three cards have the same number
                if(cards[0][0] === cards[1][0] && cards[0][0] == cards[2][0]) return 2;
                else return 0;
            case 4:
            // In a double pair, the system needs to check if the amount of cards multiply to 4
            // The counter shall count how many of each numbered cards have been selected
            // Example: The counter counted 3 8's and 1 4 || the counter counted 2 K's and 2 Q's
            // Multiplication shall show that only 2 of each card can result to 4 (3*1 = 3, 1^4 = 1, 2*2 = 4, 2*1*1 = 2)
            // This means that 2 of each card is guaranteed to be a double pair
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
                // In a combination of 5, the system needs to know various information to determine the hand selected.
                // rank string will be used to order the cards for straights
                const rank = "234567890JQKA";
                // sort based on rank
                // the sort method uses a mixture of quicksort and insertion sort
                cards = cards.sort( (a,b) => rank.indexOf(a[0]) - rank.indexOf(b[0]) );

                // setup flags to check which combination the player has selected
                let straight = true;
                let flush = true;
                // a flush can be detected with a set, a set with the length greater than 1 is not a flush
                let flushSet = new Set();
                let combination = {};

                cards.forEach( (card, i) => {
                    let first = rank.indexOf(cards[0][0])
                    let val = rank.indexOf(card[0]);
                    let suit = card[1];

                    // In a straight all card values subtracted by the index value of the loop will equal to the
                    // lowest value card in the straight. The can only be done in a sorted card array.                
                    if(val - i !== first) straight = false;
                    flushSet.add(suit);
                    // If the flush set has more than one suit then its not a flush.
                    if(flushSet.size > 1) flush = false;
                    let number = card[0];
                    combination[number] ? combination[number]++ : combination[number] = 1;
                })

                // if both striaght and flush then it is a straight flush.
                if(straight && flush) return 8;
                else if(flush) return 5;
                else if(straight) return 4; 
                else if(Object.keys(combination).length === 2){
                    let values = Object.values(combination);
                    // full house check. The system checks if the object has 3 of the same numbered cards or 2.
                    // If it does then it is guaranteed a full house. If not then it is guaranteed a four-of-a-kind.
                    // combination cannot be 3-1-1 or anything else because the length of the counter obj must be 2.
                    // 5 card possible combinations (1-1-1-1-1, 2-1-1-1, 3-1-1, 2-2-1, 3-2, 4-1). Can see that only the latter 2 have length of 2.
                    if(values[0] === 2 || values[0] === 3) return 6;
                    else return 7;
                }
                return 0;

            default: return 0;
        }
    }//useCards

    // increase speed by the food value
    useFood(food){
        this.speed += food.value;
        return food.value;
    }

    // delete a card from the inventory
    deleteCard(card){
        delete this.items.cards[card];
    }

    // delete food from the inventory
    deleteFood(food){
        let foods = this.items.foods[food]
        foods.pop();
        if(foods.length < 1){
            delete this.items.foods[food]
        }
    }
}