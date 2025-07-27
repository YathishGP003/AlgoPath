export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Get answers to common questions about AlgoPath
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What is AlgoPath?
            </h3>
            <p className="text-gray-600">
              AlgoPath is a coding practice platform that helps you improve your programming skills 
              through solving algorithmic problems and data structure challenges.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How do I get started?
            </h3>
            <p className="text-gray-600">
              Simply create an account, browse our problem set, and start solving! 
              You can track your progress and see your improvement over time.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What programming languages are supported?
            </h3>
            <p className="text-gray-600">
              We support multiple programming languages including Python, JavaScript, Java, C++, and more.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Is AlgoPath free to use?
            </h3>
            <p className="text-gray-600">
              Yes! AlgoPath is completely free to use. Create an account and start practicing today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
