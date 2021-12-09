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
            <Link href="/drivers">Tous les pilotes</Link>
          </li>
          <li>
            <Link href="/teams">Toutes les écuries</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
