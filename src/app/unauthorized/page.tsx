import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function UnauthorizedPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-red-600 text-5xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied lol</h1>
        <p className="text-gray-600 mb-6">
          You don&apos;t have permission to access this page. This area is restricted to administrators.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}