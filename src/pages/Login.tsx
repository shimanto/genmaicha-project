import { useState } from 'react'

type Props = {
  onLogin: () => void
}

export default function Login({ onLogin }: Props) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (id === 'genmai' && pw === 'genmai') {
      sessionStorage.setItem('genmaicha-brand:auth', '1')
      setError('')
      onLogin()
    } else {
      setError('IDまたはパスワードが正しくありません')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-900 via-brand-700 to-matcha-600 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <img src="/favicon.svg" alt="HOU" className="mx-auto mb-3 h-14 w-14" />
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-600">
            HOU BRAND
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">焙 ほう</h1>
          <p className="mt-1 text-xs text-stone-500">
            焙煎玄米だけの、玄米茶ブランド
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-stone-700">ID</span>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              autoComplete="username"
              autoFocus
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-stone-700">パスワード</span>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div className="rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-700 px-4 py-2.5 font-semibold text-white shadow hover:bg-brand-800"
          >
            ログイン
          </button>
        </form>

        <p className="mt-6 text-center text-[10px] text-stone-400">
          © 2026 焙 HOU | Authorized Viewers Only
        </p>
      </div>
    </div>
  )
}
