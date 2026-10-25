export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">
          Neighborhood Listing Platform
        </h1>

        <p className="mt-4 text-lg">
          Discover local properties, connect with neighborhood
          businesses, and get helpful community information.
        </p>

        <section
          aria-label="Platform features"
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          <article className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-2xl font-semibold">
              Property Listings
            </h2>
            <p className="mt-3">
              Explore available properties in your neighborhood.
            </p>
          </article>

          <article className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-2xl font-semibold">
              Neighborhood Sponsors
            </h2>
            <p className="mt-3">
              Discover local businesses supporting your community.
            </p>
          </article>

          <article className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-2xl font-semibold">
              Voice Help
            </h2>
            <p className="mt-3">
              Get helpful guidance through accessible voice assistance.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}