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
          className="rounded-md border border-ink-3 bg-ink-4 px-3 py-2 text-ink-0 placeholder:text-ink-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />

        {error && (
          <p className="text-sm text-danger" role="alert">
            Incorrect password — try again.
          </p>
        )}

        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 font-medium text-ink-0 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ink-4"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
