import { alphabet, genre } from "../../Interface/genreList and alphabetList";

export const filterData = [
    {
        title: 'Type',
        options: ["all", "TV", "movie", "ova", "special", "ona", "music"]
    },
    {
        title: 'Scores',
        options: ["all", "9+", "8+", "7+", "6+", "5+"]
    },
    {
        title: 'Rating',
        options: ["all", "g", "pg", "pg13", "r17", "r", "rx"]
    },
    {
        title: 'Status',
        options: ["all", "airing", "complete", "upcoming"]
    },
    {
        title: 'Genre',
        options: genre
    },
    {
        title: 'Letter',
        options: alphabet
    }
]