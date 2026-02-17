import {NavLink} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='flex flex-col sm:w-32 lg:w-64 shrink-0 h-full bg-stone-950 text-stone-200 border-r border-stone-800'>
      <div className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone-400'>
        Browse
      </div>

      <ul className='flex flex-col gap-1 px-2 pb-3'>
        <li>
          <NavLink
            to='/movies'
            className={({isActive}) =>
              [
                'block rounded-md px-3 py-2 text-sm transition-colors',
                'hover:bg-stone-900 hover:text-amber-300',
                isActive ? 'bg-stone-900 text-amber-300' : 'text-stone-200',
              ].join(' ')
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/watchlist'
            className={({isActive}) =>
              [
                'block rounded-md px-3 py-2 text-sm transition-colors',
                'hover:bg-stone-900 hover:text-amber-300',
                isActive ? 'bg-stone-900 text-amber-300' : 'text-stone-200',
              ].join(' ')
            }
          >
            Watchlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
