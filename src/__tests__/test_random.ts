import { expect, test } from '@jest/globals'
import * as random from '../random'

test("random.take returns array length 3", () => {
    const array = [1, 2, 3, 4, 5];
    expect(random.take(array, 3)).toHaveLength(3)
})

test("random.take(..., 0) returns []", () => {
    const array = [1, 2, 3, 4, 5];
    expect(random.take(array, 0)).toEqual([])
})

test("random.take(l, n) returns l when n <= l.length", () => {
    const array = [1, 2, 3, 4, 5];
    expect(random.take(array, 5)).toEqual(array)
})

test("random.take distribution", () => {
    // counts of appearances for all possible permutations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count: any = {
        '123': 0,
        '124': 0,
        '125': 0,
        '134': 0,
        '135': 0,
        '145': 0,
        '234': 0,
        '235': 0,
        '245': 0,
        '345': 0
    };
    
    for (let i = 0; i < 1000; i++) {
        const array = [1, 2, 3, 4, 5];
        let result = random.take(array, 3);
        result.sort()
        count[result.join('')]++;
    }

    expect(Object.values(count)).not.toContainEqual(NaN)
    expect(Object.keys(count)).toHaveLength(10)
})