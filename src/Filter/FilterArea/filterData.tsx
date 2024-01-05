import { genre } from "../../Interface/genreList and alphabetList";

export const filterData = [
    {
        title: 'Type',
        options: ["all", "TV", "movie", "ova", "special", "ona", "music"]
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
    }]
