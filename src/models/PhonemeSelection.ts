import { Phoneme } from "./Phoneme"

export type PhonemeSelection = {
    phoneme: Phoneme, 
    selected: boolean,
}

export function selected_phonemes(phoneme_selections: PhonemeSelection[]): Phoneme[]
{
    return phoneme_selections
        .filter(phs => phs.selected)
        .map(phs => phs.phoneme)
}

export function create_phoneme_selections(all: Phoneme[], selected: Phoneme[]): PhonemeSelection[]
{
    return all.map((ph) => ({
        phoneme: ph,
        selected: selected.includes(ph),
    }))
}

export function concat_phoneme_selections(phs1: PhonemeSelection[], phs2: PhonemeSelection[]): Phoneme[] {
    return selected_phonemes(phs1)
        .concat(selected_phonemes(phs2))
}