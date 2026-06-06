import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-slate-600">
        We could not find the page you were looking for.
      </p>
      <p className="mt-6">
        <Link href="/blog" className="font-medium text-brand hover:underline">
          Back to blog
        </Link>
      </p>
    </section>
  );
}
