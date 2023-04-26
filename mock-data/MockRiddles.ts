import {CountryCode} from "../src/utils/CountryCodes";
import {Difficulty, DifficultyType, getDifficultyObject} from "../src/utils/Difficulty";
import {RiddleStatus} from "../src/utils/Enums";

type Riddle = {
    name: string;
    image: string;
    state: RiddleStatus;
    country: CountryCode;
    difficulty: Difficulty;
};

const Riddles = [{
    name: "Anagram",
    image: "public/vite.svg",
    state: RiddleStatus.Solved,
    countryCode: 'CS',
    difficulty: getDifficultyObject(1)
}, {
    name: "Monogram",
    image: "public/vite.svg",
    state: RiddleStatus.Unfinished,
    countryCode: 'GB',
    difficulty: getDifficultyObject(3)
}, {
    name: "Diagram",
    image: "public/vite.svg",
    state: RiddleStatus.Untouched,
    countryCode: 'CO',
    difficulty: getDifficultyObject(2)
}];
