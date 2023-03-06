import axios from "axios"
import fs from "fs"
// const getUserGamesAsync = async (userProfile) => {
//     return new Promise(() => {

//     axios.get(userProfile, {

//     });
//     });

// }

export type ReviewDesc = "Overwhelmingly Positive" | "test";

export type WishlistItemType = "Game" | "DLC";

export type GamesList = {
    [key: string]: {
        name: string,
        capsule: string,
        review_score: number,
        review_desc: ReviewDesc,
        reviews_total: string,
        reviews_percent: number,
        release_data: string,
        release_string: string,
        platform_icons: string,
        subs: Array<{ id: number, discount_block: string, discount_pct: 0, price: number }>,
        type: WishlistItemType,
        review_css: string,
        priority: number,
        added: number,
        background: string,
        rank: number,
        tags: [string],
        is_free_game: boolean,
        deck_compat: string,
        win: number,
    }
};

// https://store.steampowered.com/wishlist/profiles/*/wishlistdata/?p=0&v=
const getUserGames = async (userProfileUrl: string): Promise<GamesList> => {
    let games = {};
    let finished = false;
    let page = 0;

    while (!finished) {
        const { data } = await axios.get(userProfileUrl + '/wishlistdata', { params: { p: page } });
        console.log(Object.keys(data).length);
        if (Object.keys(data).length == 0) {
            finished = true;
        }
        // console.log(data);
        games = { ...games, ...data };
        page++;
    }
    return games;
}

export const SteamWishlistParser = () => [
    getUserGames,
];

fs.writeFile('test.json', JSON.stringify(await getUserGames('https://store.steampowered.com/wishlist/profiles/')), err => {
    if (err) {
        console.log(err)
    }
});