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
    if (id === 'matsu' && pw === 'matsu') {
      sessionStorage.setItem('genmaicha-brand:auth', '1')
      setError('')
      onLogin()
    } else {
      setError('IDまたはパスワードが正しくありません')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-900 via-brand-700 to-matcha-700 p-4">
      <div className="w-full max-w-md rounded-2xl bg-washi-50 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <img src="/favicon.svg" alt="紡 TSUMUGI" className="mx-auto mb-3 h-14 w-14" />
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-700">
            TSUMUGI
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-900">紡</h1>
          <p className="mt-1 text-xs text-brand-800/70">焙煎玄米の老舗を、世界へ。</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-brand-900">ID</span>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-md border border-washi-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              autoComplete="username"
              autoFocus
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-brand-900">パスワード</span>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full rounded-md border border-washi-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
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

        <p className="mt-6 text-center text-[10px] text-brand-800/50">
          © 2026 紡 TSUMUGI | Authorized Users Only
        </p>
      </div>
    </div>
  )
}
