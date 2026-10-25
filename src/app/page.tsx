import PropertyExplorer from "../components/PropertyExplorer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Neighborhood Listing Platform
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Discover local properties, connect with neighborhood
            businesses, and get helpful community information.
          </p>

          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Demonstration only: Property prices, specifications,
            and photographs are illustrative and are not verified listings.
          </p>
        </header>

        <PropertyExplorer />

        <section
          aria-labelledby="features-heading"
          className="mt-16 border-t border-slate-200 pt-10"
        >
          <h2
            id="features-heading"
            className="mb-6 text-2xl font-bold"
          >
            More platform features
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                Property Listings
              </h3>
              <p className="mt-3 text-slate-700">
                Explore available properties in your neighborhood.
              </p>
            </article>

            <article className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                Neighborhood Sponsors
              </h3>
              <p className="mt-3 text-slate-700">
                Discover local businesses supporting your community.
              </p>
            </article>

            <article className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                Voice Help
              </h3>
              <p className="mt-3 text-slate-700">
                Get helpful guidance through accessible voice assistance.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
