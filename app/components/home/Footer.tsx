export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-10 md:px-12">
      <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
        <li>
          <a
            href="https://sps.seedlingschools.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SPS
          </a>
        </li>
        <li>
          <a
            href="https://smhs.seedlingschools.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SMHS
          </a>
        </li>
        <li>
          <a
            href="https://seedling-international-academy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cambridge
          </a>
        </li>
        <li>
          <a
            href="https://seedlingschools.com/alumni.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alumni
          </a>
        </li>
        <li>
          <a
            href="https://seedlingschools.com/about-us.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </a>
        </li>
      </ul>
      <p className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Seedling Group of Schools. All rights reserved.
      </p>
    </footer>
  )
}
