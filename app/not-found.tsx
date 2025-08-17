import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-[--muted]">We couldn’t find that page. Try going back home.</p>
      <Link className="mt-4 inline-block text-accent-500" href="/">← Back to Home</Link>
    </div>
  );
}
