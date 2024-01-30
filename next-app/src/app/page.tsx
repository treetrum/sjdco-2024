import { type Home } from '../../../shared/payload-types';
import { HomePage } from './HomePage';

export default async function Home() {
    const data: Home = await fetch(
        `http://localhost:3000/api/globals/home?locale=undefined&draft=false&depth=1`,
    ).then((res) => res.json());

    return <HomePage data={data} />;
}
