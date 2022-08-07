export function shuffle<T>(list: T[]): T[] {
    const result = list.map((x) => x);
    for (let i=list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]]
    }
    return result;
}

export function randnum(from: number, to: number): number {
    return Math.floor(Math.random() * (to - from + 1) + from)
}

export function pick<T>(list: T[]): T
{
    const end = list.length - 1;
    const index = randnum(0, end);
    return list[index];
}

export function take<T>(list: T[], n: number): T[]
{
    let indexes:number[] = []
    const length = list.length
    if (length <= n) {
        // If `n` is too big, just return the list 
        return list
    }
    for (let i = 0; i < n; i++) {
        let new_index = randnum(0, length-1)
        while (indexes.includes(new_index)) {
            new_index = randnum(0, length-1)
        }
        indexes.push(new_index)
    }
    return indexes.map((i) => list[i])
}

export function test_randnum_distribution() {
    // counts of appearances for all possible permutations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count: any = {
        "1": 0,
        '2': 0,
        '3': 0,
    };
    
    for (let i = 0; i < 1000; i++) {
        const result = randnum(1, 3).toString();
        count[result]++;
    }
    
    // show counts of all possible permutations
    for (const key in count) {
        console.log(`${key}: ${count[key]}`);
    }
}

export function test_shuffle_distribution() {
    // counts of appearances for all possible permutations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count: any = {
        "123": 0,
        '132': 0,
        '213': 0,
        '231': 0,
        '321': 0,
        '312': 0
    };
    
    for (let i = 0; i < 1000; i++) {
        const array = [1, 2, 3];
        const result = shuffle(array);
        count[result.join('')]++;
    }
    
    // show counts of all possible permutations
    for (const key in count) {
        console.log(`${key}: ${count[key]}`);
    }
}

export function test_take_distribution() {
    // counts of appearances for all possible permutations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count: any = {
        '123': 0,
        '234': 0,
        '345': 0,
    };
    
    for (let i = 0; i < 1000; i++) {
        const array = [1, 2, 3, 4, 5];
        let result = take(array, 3);
        result.sort()
        count[result.join('')]++;
    }
    
    // show counts of all possible permutations
    for (const key in count) {
        console.log(`${key}: ${count[key]}`);
    }
}

// test_shuffle_distribution()
// test_randnum_distribution()
// test_take_distribution()