import {Link} from 'react-router-dom';
import PopcornIcon from '../icons/Popcorn';

export default function Header() {
  return (
    <header className='w-full h-16 bg-stone-950 text-white flex items-center px-6 justify-center'>
      <Link to='/' className='text-2xl font-bold tracking-wide'>
        MovieApp
      </Link>
      <PopcornIcon />
    </header>
  );
}
