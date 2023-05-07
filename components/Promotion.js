import Image from 'next/image';
import Link from 'next/link';

export default function Promotion() {
  return (
    <div className="bg-[#1a1d28]">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <div className="text-3xl font-bold tracking-tight text-[#ffc823] sm:text-4xl">
          <span className="block">Hungry?</span>
          <span className="block text-white">
            Grab some pizza from Rakii Pizza
          </span>
          <div className="inline-flex rounded-md shadow my-5">
            <h3>
              <Link
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#ffc823] px-5 py-3 text-base font-medium text-black"
                href="/search"
              >
                Get Your Pizza Now
              </Link>
            </h3>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow my-5">
            <h3>
              <Link
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-black"
                href="/search"
              >
                Check Menu
              </Link>
            </h3>
          </div>
        </div>

        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <Image src="/images/promotion.png" alt="" width="400" height="400" />
        </div>
      </div>
    </div>
  );
}
