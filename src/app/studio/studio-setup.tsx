export function StudioSetup() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8">
      <h1 className="page-title">Studio</h1>
      <p className="text-muted-sm scrolling-subheader">Edit upcoming shows.</p>
      <div className="state-panel state-panel--setup mt-6 max-w-3xl">
        <p className="state-panel-title">Sanity is not configured</p>
        <p className="text-muted">
          Set NEXT_PUBLIC_SANITY_PROJECT_ID to open the show editor. NEXT_PUBLIC_SANITY_DATASET
          defaults to production.
        </p>
      </div>
    </main>
  );
}
