function hash(input){

    if(input === undefined || input === null){ // check if valid input
        console.error("Can't hash null or undefined input");
        return null;
    }

    input = input.toString() + "GMaQLe9RDsASMxZm"; // convert input to string, append filler to ensure 16 digits minimum
    let sum = input.charCodeAt(0); // initial sum
    let accumulator = ""; // final output string that gets converted to an int
    let output = [ // 16 9-digit primes, serve as mask
                    808933981, 
                    765809491,
                    390493679,
                    544627277,
                    856868113,
                    704909377,
                    572600191,
                    821097707,
                    230376011,
                    184848203,
                    473243581,
                    687924253,
                    446183149,
                    856675481,
                    557158177,
                    537446519
                 ];

    for(let i = 0; i < input.length; i++){ // accumulate sum
        sum += Math.pow(input.charCodeAt(i), 2) * i;
    }

    for(let i = 0; i < input.length; i++){ // mash sum with each input digit
        output[i % 16] = (output[i % 16] ^ Math.abs(sum ^ input.charCodeAt(i))) % 16;
    }

    for(let i = 0; i < 16; i++){ // concatonate into string
        accumulator += output[i].toString(16);
    }
    
    return accumulator;
}
