import Link from 'next/link';
import { type JSX } from 'react';

interface TabItem {
  name: string
  href: string
}

const TAB_ITEM_LIST: TabItem[] = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Mods',
    href: '/?q=type:mod'
  },
  {
    name: 'Modpacks',
    href: '/?q=type:modpack'
  },
  {
    name: 'Addons',
    href: '/?q=type:addon'
  },
  {
    name: 'Worlds',
    href: '/?q=type:world'
  },
];

export default function LowerNav (): JSX.Element {
  return (
    <nav>
      <div className="container mx-auto my-2">
        <div className="overflow-x-auto">
          <ul className="flex whitespace-nowrap">
            {TAB_ITEM_LIST.map(tabItem => (
              <li key={tabItem.href}>
                <Link
                  href={tabItem.href}
                  className="block mx-1 px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  {tabItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
