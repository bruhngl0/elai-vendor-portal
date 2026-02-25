import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest in becoming an ELAI vendor. Your application has been received and is now under review.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">What Happens Next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">1.</span>
                <p className="text-gray-700">Our team will review your application and documents (typically within 24-48 hours)</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">2.</span>
                <p className="text-gray-700">You'll receive an email notification once a decision has been made</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">3.</span>
                <p className="text-gray-700">If approved, you'll receive a link to complete your seller agreement and setup your shop</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Application ID:</strong> #KYC-PENDING
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Please save this reference number for your records.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block text-center"
              >
                Return to Homepage
              </Link>
              <Link
                href="/status"
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-block text-center"
              >
                Check Application Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}