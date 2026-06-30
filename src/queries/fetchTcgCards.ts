import axios from "axios";

export interface TcgCard {
    id: string;
    name: string;
    number: string;
    rarity?: string;
    images: {
        small: string;
        large: string;
    };
    set: {
        name: string;
        series: string;
        releaseDate: string;
        images: {
            symbol: string;
            logo: string;
        };
    };
}

interface TcgApiResponse {
    data: TcgCard[];
}

/**
 * Busca cartas do TCG (Trading Card Game) relacionadas a um Pokémon pelo nome.
 * Utiliza a API pública gratuita https://api.pokemontcg.io/v2
 */
export async function fetchTcgCards(name: string): Promise<TcgCard[]> {
    if (!name) return [];

    const response = await axios.get<TcgApiResponse>(
        "https://api.pokemontcg.io/v2/cards",
        {
            params: {
                q: `name:"${name}"`,
                orderBy: "-set.releaseDate",
                pageSize: 12,
            },
        }
    );

    return response.data?.data ?? [];
}
