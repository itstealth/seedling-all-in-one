export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12">
      <span className="text-lg font-semibold tracking-tight">
        Seedling Group of Schools
      </span>
      <ul className="flex items-center gap-6 text-sm font-medium">
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
      </ul>
    </nav>
  )
}
