import Link from "next/link";

export default function BaseHeader() {
  return (
    <header>
      <strong>
        <Link href="/">FORMULA ONE</Link>
      </strong>
      <nav>
        <ul>
          <li>
            <Link href="/drivers">Drivers</Link>
          </li>
          <li>
            <Link href="/teams">Teams</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
