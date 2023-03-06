import axios from "axios"

// const getUserGamesAsync = async (userProfile) => {
//     return new Promise(() => {

//     axios.get(userProfile, {

//     });
//     });

// }

// https://store.steampowered.com/wishlist/profiles/76561198444790080/wishlistdata/?p=0&v=
const getUserGames = (userProfileUrl) => {
    const games = [];
    let finished = false;
    let page = 0;
    while (!finished) {
        axios.get(userProfileUrl + '/wishlistdata', { params: { p: page } }).then(({ data }) => {
            if (data.length != 99) {
                games.concat(data);
            }
        });
    }
}

export const SteamWishlistParser = () => [
    getUserGames,
];