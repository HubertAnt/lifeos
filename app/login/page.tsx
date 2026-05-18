export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        action="/api/auth/login"
        method="POST"
        className="flex w-full max-w-xs flex-col gap-4"
      >
        {next && <input type="hidden" name="next" value={next} />}

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight text-ink-0">
            lifeos
          </h1>
          <p className="text-sm text-ink-2">Enter your password to continue.</p>
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          autoComplete="current-password"
          required
          className="rounded-md border border-[var(--line)] bg-[oklch(0_0_0/0.25)] px-3 py-2 text-ink-0 placeholder:text-ink-2 focus:border-a-water focus:outline-none focus:ring-1 focus:ring-a-water"
        />

        {error && (
          <p className="text-sm text-danger" role="alert">
            Incorrect password — try again.
          </p>
        )}

        <button
          type="submit"
          className="rounded-md bg-a-water px-4 py-2 font-medium text-[oklch(0.17_0.018_175)] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-a-water focus:ring-offset-2 focus:ring-offset-bg-0"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
